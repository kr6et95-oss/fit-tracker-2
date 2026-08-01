(function () {
  'use strict';

  const CONFIG_KEY = 'fit-tracker-2-cloud-config-v1';
  const SESSION_KEY = 'fit-tracker-2-cloud-session-v1';
  const META_KEY = 'fit-tracker-2-cloud-meta-v1';
  const DEVICE_KEY = 'fit-tracker-2-cloud-device-v1';

  let config = readJson(CONFIG_KEY, { url: '', anonKey: '', autoSync: true });
  let session = readJson(SESSION_KEY, null);
  let meta = readJson(META_KEY, { lastSyncedAt: 0, dirtyAt: 0, remoteUpdatedAt: '', remoteRevision: 0 });
  let user = null;
  let syncing = false;
  let applyingRemote = false;
  let pushTimer = null;
  let pollTimer = null;
  let originalSave = null;

  const deviceId = (() => {
    let value = localStorage.getItem(DEVICE_KEY);
    if (!value) {
      value = 'dev_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 9);
      localStorage.setItem(DEVICE_KEY, value);
    }
    return value;
  })();

  function readJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function cleanUrl(value) {
    return String(value || '').trim().replace(/\/+$/, '');
  }

  function validConfig(candidate = config) {
    if (!candidate || !candidate.url || !candidate.anonKey) return false;
    try {
      const parsed = new URL(candidate.url);
      return (parsed.protocol === 'https:' || parsed.hostname === 'localhost') && !!candidate.anonKey.trim();
    } catch (e) {
      return false;
    }
  }

  function formatTime(value) {
    if (!value) return '아직 없음';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '아직 없음';
    return new Intl.DateTimeFormat('ko-KR', {
      month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(d);
  }

  function initials(email) {
    const head = String(email || 'ME').split('@')[0].replace(/[^a-z0-9가-힣]/gi, '');
    return (head.slice(0, 2) || 'ME').toUpperCase();
  }

  function setMessage(text, tone) {
    const el = document.getElementById('cloudMessage');
    if (!el) return;
    el.textContent = text;
    el.className = 'cloud-message' + (tone ? ' ' + tone : '');
  }

  function setHeader(state, text) {
    const pill = document.getElementById('cloudHeaderPill');
    const label = document.getElementById('cloudHeaderText');
    if (pill) pill.className = 'sync-pill' + (state ? ' ' + state : '');
    if (label) label.textContent = text || '이 기기';
  }

  function render() {
    const configured = validConfig();
    const signedIn = !!(session && session.access_token && user);
    const authBox = document.getElementById('cloudAuthBox');
    const sessionBox = document.getElementById('cloudSessionBox');
    const badge = document.getElementById('cloudStateBadge');
    const email = document.getElementById('cloudUserEmail');
    const avatar = document.getElementById('cloudAvatar');
    const last = document.getElementById('cloudLastSync');
    const auto = document.getElementById('cloudAutoSync');
    const url = document.getElementById('cloudUrl');
    const key = document.getElementById('cloudAnonKey');

    if (url && document.activeElement !== url) url.value = config.url || '';
    if (key && document.activeElement !== key) key.value = config.anonKey || '';
    if (authBox) authBox.hidden = signedIn;
    if (sessionBox) sessionBox.hidden = !signedIn;
    if (auto) auto.checked = config.autoSync !== false;

    if (badge) {
      badge.textContent = syncing ? '동기화 중' : signedIn ? '동기화 연결' : configured ? '로그인 필요' : '로컬 전용';
      badge.className = 'cloud-state' + (signedIn ? ' online' : '');
    }
    if (email) email.textContent = user ? user.email : '—';
    if (avatar) avatar.textContent = initials(user && user.email);
    if (last) last.textContent = '최근 동기화 · ' + formatTime(meta.lastSyncedAt);

    if (syncing) setHeader('syncing', '맞추는 중');
    else if (signedIn) setHeader('online', '동기화됨');
    else setHeader('', '이 기기');
  }

  async function request(path, options = {}) {
    if (!validConfig()) throw new Error('Supabase 연결 정보를 먼저 저장해 주세요.');
    const useSession = options.useSession !== false;
    if (useSession && session) await refreshSessionIfNeeded();
    const token = useSession && session && session.access_token ? session.access_token : config.anonKey;
    const headers = Object.assign({
      apikey: config.anonKey,
      Authorization: 'Bearer ' + token
    }, options.headers || {});
    if (options.body !== undefined) headers['Content-Type'] = 'application/json';

    const response = await fetch(config.url + path, {
      method: options.method || 'GET',
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body)
    });
    const raw = await response.text();
    let data = null;
    if (raw) {
      try { data = JSON.parse(raw); } catch (e) { data = raw; }
    }
    if (!response.ok) {
      const detail = data && (data.msg || data.message || data.error_description || data.error);
      const err = new Error(detail || '클라우드 요청에 실패했습니다. (' + response.status + ')');
      err.status = response.status;
      throw err;
    }
    return data;
  }

  function storeSession(next) {
    if (!next || !next.access_token) {
      session = null;
      localStorage.removeItem(SESSION_KEY);
      return;
    }
    session = Object.assign({}, next, {
      expires_at_ms: Date.now() + Math.max(60, Number(next.expires_in) || 3600) * 1000
    });
    writeJson(SESSION_KEY, session);
  }

  async function refreshSessionIfNeeded() {
    if (!session || !session.refresh_token) return;
    const expires = Number(session.expires_at_ms) || 0;
    if (expires && expires - Date.now() > 90 * 1000) return;
    const data = await request('/auth/v1/token?grant_type=refresh_token', {
      method: 'POST',
      useSession: false,
      body: { refresh_token: session.refresh_token }
    });
    storeSession(data);
  }

  async function loadUser() {
    if (!session || !session.access_token) {
      user = null;
      return null;
    }
    try {
      user = await request('/auth/v1/user');
      return user;
    } catch (e) {
      if (e.status === 401 || e.status === 403) {
        storeSession(null);
        user = null;
      }
      throw e;
    }
  }

  function authFields() {
    return {
      email: String(document.getElementById('cloudEmail')?.value || '').trim(),
      password: String(document.getElementById('cloudPassword')?.value || '')
    };
  }

  async function signInFromForm() {
    const values = authFields();
    if (!validConfig()) return setMessage('먼저 Supabase Project URL과 anon key를 저장해 주세요.', 'warn');
    if (!values.email || values.password.length < 6) return setMessage('이메일과 6자 이상의 비밀번호를 입력해 주세요.', 'warn');
    setBusy(true, '로그인 중');
    try {
      const data = await request('/auth/v1/token?grant_type=password', {
        method: 'POST', useSession: false, body: values
      });
      storeSession(data);
      user = data.user || await loadUser();
      setMessage('로그인했습니다. 클라우드 기록을 확인하는 중입니다.', 'good');
      render();
      await reconcileAfterLogin();
    } catch (e) {
      setMessage(humanError(e), 'bad');
    } finally {
      setBusy(false);
    }
  }

  async function signUpFromForm() {
    const values = authFields();
    if (!validConfig()) return setMessage('먼저 Supabase Project URL과 anon key를 저장해 주세요.', 'warn');
    if (!values.email || values.password.length < 6) return setMessage('이메일과 6자 이상의 비밀번호를 입력해 주세요.', 'warn');
    setBusy(true, '계정 생성 중');
    try {
      const data = await request('/auth/v1/signup', {
        method: 'POST', useSession: false, body: values
      });
      if (data && data.access_token) {
        storeSession(data);
        user = data.user || await loadUser();
        setMessage('계정을 만들고 로그인했습니다.', 'good');
        render();
        await reconcileAfterLogin();
      } else {
        setMessage('계정을 만들었습니다. 받은 편지함에서 확인 링크를 누른 뒤 로그인해 주세요.', 'good');
      }
    } catch (e) {
      setMessage(humanError(e), 'bad');
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    if (!confirm('이 기기에서 클라우드 계정을 로그아웃할까요? 로컬 기록은 그대로 남습니다.')) return;
    try {
      if (session) await request('/auth/v1/logout', { method: 'POST' });
    } catch (e) {
      // Local logout must still work if the network is down.
    }
    storeSession(null);
    user = null;
    clearTimeout(pushTimer);
    setMessage('로그아웃했습니다. 기록은 이 기기에 계속 저장됩니다.');
    render();
  }

  function setBusy(value, label) {
    syncing = !!value;
    if (value && label) setMessage(label + '…');
    render();
  }

  function humanError(error) {
    const raw = String(error && error.message || error || '알 수 없는 오류');
    if (/invalid login credentials/i.test(raw)) return '이메일 또는 비밀번호가 맞지 않습니다.';
    if (/email not confirmed/i.test(raw)) return '이메일 확인을 마친 뒤 로그인해 주세요.';
    if (/failed to fetch|networkerror|load failed/i.test(raw)) return '네트워크 또는 Supabase 주소를 확인해 주세요.';
    if (/row-level security|permission denied/i.test(raw)) return 'Supabase 권한 설정이 필요합니다. supabase-setup.sql을 실행해 주세요.';
    return raw;
  }

  async function getRemote() {
    if (!user) await loadUser();
    const query = '/rest/v1/fit_tracker_states?select=payload,updated_at,revision,device_id&user_id=eq.' + encodeURIComponent(user.id) + '&limit=1';
    const rows = await request(query, { headers: { Accept: 'application/json' } });
    return Array.isArray(rows) && rows.length ? rows[0] : null;
  }

  function currentPayload() {
    if (typeof buildBackupPayload !== 'function') throw new Error('앱 데이터가 아직 준비되지 않았습니다.');
    return buildBackupPayload();
  }

  function saveMeta(next) {
    meta = Object.assign({}, meta, next);
    writeJson(META_KEY, meta);
    render();
  }

  async function push(force) {
    if (!session) return setMessage('먼저 로그인해 주세요.', 'warn');
    if (!navigator.onLine) return setMessage('오프라인입니다. 연결되면 자동으로 동기화합니다.', 'warn');
    if (force) {
      const ok = confirm('이 기기의 현재 기록으로 클라우드 데이터를 덮어쓸까요? 다른 기기의 최신 변경이 사라질 수 있습니다.');
      if (!ok) return false;
    }
    setBusy(true, '클라우드에 올리는 중');
    try {
      if (!user) await loadUser();
      const payload = currentPayload();
      const bytes = new Blob([JSON.stringify(payload)]).size;
      if (bytes > 8 * 1024 * 1024) throw new Error('동기화 데이터가 8MB를 넘습니다. 사진을 줄이거나 백업 파일을 사용해 주세요.');
      const revision = Math.max(0, Number(meta.remoteRevision) || 0) + 1;
      const now = new Date().toISOString();
      const rows = await request('/rest/v1/fit_tracker_states?on_conflict=user_id', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=representation' },
        body: {
          user_id: user.id,
          payload,
          app_version: typeof APP_VERSION !== 'undefined' ? APP_VERSION : '5.0',
          revision,
          device_id: deviceId,
          updated_at: now
        }
      });
      const row = Array.isArray(rows) && rows[0] ? rows[0] : null;
      saveMeta({
        lastSyncedAt: Date.now(), dirtyAt: 0,
        remoteUpdatedAt: row && row.updated_at || now,
        remoteRevision: row && row.revision || revision
      });
      setMessage('이 기기의 최신 기록을 클라우드에 저장했습니다.', 'good');
      return true;
    } catch (e) {
      setHeader('error', '동기화 오류');
      setMessage(humanError(e), 'bad');
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function applyRemote(remote, manual) {
    if (!remote || !remote.payload) return false;
    if (manual && S && S.setup) {
      const ok = confirm('클라우드 기록으로 이 기기의 현재 기록을 교체할까요? 먼저 필요하면 백업 파일을 저장해 주세요.');
      if (!ok) return false;
    }
    applyingRemote = true;
    try {
      const applied = applyBackup(remote.payload, '클라우드', false, true);
      if (!applied) return false;
      saveMeta({
        lastSyncedAt: Date.now(), dirtyAt: 0,
        remoteUpdatedAt: remote.updated_at || '',
        remoteRevision: Number(remote.revision) || 0
      });
      setMessage('클라우드 기록을 이 기기에 적용했습니다.', 'good');
      return true;
    } finally {
      applyingRemote = false;
    }
  }

  async function pull(manual) {
    if (!session) return setMessage('먼저 로그인해 주세요.', 'warn');
    if (!navigator.onLine) return setMessage('오프라인이라 클라우드 기록을 받을 수 없습니다.', 'warn');
    setBusy(true, '클라우드에서 받는 중');
    try {
      const remote = await getRemote();
      if (!remote) {
        setMessage('클라우드에 아직 기록이 없습니다. 이 기기 데이터를 먼저 올려 주세요.', 'warn');
        return false;
      }
      return await applyRemote(remote, !!manual);
    } catch (e) {
      setHeader('error', '동기화 오류');
      setMessage(humanError(e), 'bad');
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function syncNow(manual) {
    if (syncing) return false;
    if (!session) return setMessage('먼저 로그인해 주세요.', 'warn');
    if (!navigator.onLine) return setMessage('오프라인입니다. 변경사항은 이 기기에 저장됐습니다.', 'warn');
    setBusy(true, '변경사항 확인 중');
    try {
      const remote = await getRemote();
      if (!remote) {
        setBusy(false);
        return await push(false);
      }

      const remoteAt = Date.parse(remote.updated_at || '') || 0;
      const knownRemoteAt = Date.parse(meta.remoteUpdatedAt || '') || 0;
      const localDirty = Number(meta.dirtyAt) > Number(meta.lastSyncedAt || 0);
      const remoteChanged = remoteAt > knownRemoteAt + 1000 || Number(remote.revision) > Number(meta.remoteRevision || 0);

      if (!meta.lastSyncedAt) {
        setMessage('이 계정에 기존 클라우드 기록이 있습니다. 아래에서 “클라우드 받기” 또는 “이 기기 올리기”를 선택해 주세요.', 'warn');
        return false;
      }
      if (localDirty && remoteChanged) {
        setMessage('이 기기와 클라우드가 모두 변경됐습니다. 두 방향 중 보존할 쪽을 직접 선택해 주세요.', 'warn');
        return false;
      }
      if (remoteChanged) return await applyRemote(remote, false);
      if (localDirty) {
        setBusy(false);
        return await push(false);
      }
      saveMeta({ lastSyncedAt: Date.now() });
      setMessage('모든 기기의 기록이 최신입니다.', 'good');
      return true;
    } catch (e) {
      setHeader('error', '동기화 오류');
      setMessage(humanError(e), 'bad');
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function reconcileAfterLogin() {
    try {
      const remote = await getRemote();
      if (!remote) {
        setMessage('첫 연결입니다. 이 기기의 기록을 클라우드에 저장합니다.', 'good');
        await push(false);
        return;
      }
      if (!meta.lastSyncedAt) {
        setMessage('기존 클라우드 기록을 찾았습니다. “클라우드 받기” 또는 “이 기기 올리기”를 선택해 주세요.', 'warn');
        return;
      }
      await syncNow(false);
    } catch (e) {
      setMessage(humanError(e), 'bad');
    }
  }

  function markDirty() {
    if (applyingRemote) return;
    saveMeta({ dirtyAt: Date.now() });
    if (config.autoSync !== false && session) schedulePush();
  }

  function schedulePush() {
    clearTimeout(pushTimer);
    pushTimer = setTimeout(() => {
      if (document.visibilityState === 'visible' && navigator.onLine) syncNow(false);
    }, 2500);
  }

  function patchSave() {
    if (originalSave || typeof window.save !== 'function') return;
    originalSave = window.save;
    window.save = function () {
      const result = originalSave.apply(this, arguments);
      markDirty();
      return result;
    };
  }

  function saveConfigFromForm() {
    const next = {
      url: cleanUrl(document.getElementById('cloudUrl')?.value),
      anonKey: String(document.getElementById('cloudAnonKey')?.value || '').trim(),
      autoSync: config.autoSync !== false
    };
    if (!validConfig(next)) return setMessage('올바른 https:// Project URL과 anon key를 입력해 주세요.', 'warn');
    const changed = next.url !== config.url || next.anonKey !== config.anonKey;
    config = next;
    writeJson(CONFIG_KEY, config);
    if (changed) {
      storeSession(null);
      user = null;
      meta = { lastSyncedAt: 0, dirtyAt: Date.now(), remoteUpdatedAt: '', remoteRevision: 0 };
      writeJson(META_KEY, meta);
    }
    setMessage('Supabase 연결 정보를 저장했습니다. 이제 로그인할 수 있습니다.', 'good');
    render();
  }

  function setAutoSync(value) {
    config.autoSync = !!value;
    writeJson(CONFIG_KEY, config);
    setMessage(value ? '자동 동기화를 켰습니다.' : '자동 동기화를 껐습니다. 수동 동기화는 계속 사용할 수 있습니다.', 'good');
    if (value && session) schedulePush();
  }

  async function bootstrap() {
    patchSave();
    render();
    window.addEventListener('online', () => {
      setMessage('온라인으로 전환됐습니다. 변경사항을 확인합니다.', 'good');
      if (session && config.autoSync !== false) syncNow(false);
    });
    window.addEventListener('offline', () => {
      setHeader('', '오프라인');
      setMessage('오프라인입니다. 기록은 이 기기에 저장되고, 연결되면 다시 맞춥니다.', 'warn');
    });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible' && session && config.autoSync !== false) syncNow(false);
    });

    if (session && validConfig()) {
      try {
        await loadUser();
        render();
        if (user && config.autoSync !== false) await reconcileAfterLogin();
      } catch (e) {
        setMessage(humanError(e), 'bad');
        render();
      }
    }
    clearInterval(pollTimer);
    pollTimer = setInterval(() => {
      if (session && config.autoSync !== false && navigator.onLine && document.visibilityState === 'visible') syncNow(false);
    }, 90000);
  }

  window.FTCloud = {
    saveConfigFromForm,
    signInFromForm,
    signUpFromForm,
    signOut,
    syncNow: () => syncNow(true),
    pull: (manual) => pull(manual !== false),
    push: (manual) => push(manual !== false),
    setAutoSync,
    render
  };

  bootstrap();
})();
