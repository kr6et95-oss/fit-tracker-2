const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = __dirname;
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const fail = (message) => {
  throw new Error(message);
};

const index = read('index.html');
const worker = read('sw.js');
const cloud = read('cloud-sync.js');
const diet = read('diet-v5.js');
const health = read('health-v5.js');
const polish = read('v5.css');
const foodsSource = read('foods.js');

for (const [file, source] of [['cloud-sync.js', cloud], ['diet-v5.js', diet], ['health-v5.js', health], ['sw.js', worker]]) {
  new vm.Script(source, { filename: file });
}

const inlineScripts = [...index.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
inlineScripts.forEach((match, index) => new vm.Script(match[1], { filename: `index-inline-${index}.js` }));

const htmlVersion = index.match(/const APP_VERSION = '([^']+)'/)?.[1];
const workerVersion = worker.match(/const APP_VERSION = '([^']+)'/)?.[1];
if (!htmlVersion || htmlVersion !== workerVersion) fail('index.html and sw.js APP_VERSION must match');

const cacheName = worker.match(/const CACHE = '([^']+)'/)?.[1];
if (!cacheName) fail('service worker CACHE is missing');
if (/three(?:\.min)?\.js/i.test(index + worker)) fail('Removed Three.js dependency must not return');

for (const marker of ['v5.css', 'cloud-sync.js', 'diet-v5.js', 'health-v5.js', 'cloudAccountCard', 'v-health', 'data-v="health"']) {
  if (!index.includes(marker)) fail(`index.html is missing ${marker}`);
}

const navBlock = index.match(/<nav class="nav"[\s\S]*?<\/nav>/)?.[0] || '';
const navButtons = [...navBlock.matchAll(/<button\b/g)];
if (navButtons.length !== 5) fail(`primary navigation must have exactly 5 items, found ${navButtons.length}`);
if (/data-v="(?:rest|report)"/.test(navBlock)) fail('secondary screens must not crowd primary navigation');
if (!/class="more-shortcuts"/.test(index)) fail('secondary quick menu is missing');
if (!/white-space:\s*nowrap/.test(polish)) fail('single-line navigation guard is missing');
if (!/items\.filter\(x => x\.status === 'emergency'\)/.test(index)) fail('first-use emergency popup guard is missing');

const assetsBlock = worker.match(/const ASSETS = \[([\s\S]*?)\];/)?.[1] || '';
const localAssets = [...assetsBlock.matchAll(/'\.\/([^']*)'/g)].map((match) => match[1]).filter(Boolean);
for (const asset of localAssets) {
  if (!fs.existsSync(path.join(root, asset))) fail(`service worker asset does not exist: ${asset}`);
}

if (!/enable row level security/i.test(read('supabase-setup.sql'))) fail('Supabase RLS setup is missing');
if (!/auth\.uid\(\)/i.test(read('supabase-setup.sql'))) fail('Supabase ownership policy is missing');
if (!/cooperEstimate/.test(health) || !/504\.9/.test(health) || !/44\.73/.test(health)) fail('Cooper fitness estimate is missing');
if (/운동 전 안전 확인/.test(health) || /health-safety-card/.test(health)) fail('Removed safety confirmation UI must not return');
if (!/max="60"/.test(health) || !/12분 달리기/.test(health)) fail('Short strength and running tests are missing');
if (!/supplementTaken/.test(health) || !/vitaminRecommendations/.test(health)) fail('Supplement tracking is missing');

const foodSandbox = { window: {} };
vm.runInNewContext(foodsSource, foodSandbox, { filename: 'foods.js' });
const foods = foodSandbox.window.FT_FOODS || [];
if (foods.length < 2000) fail(`food database unexpectedly small: ${foods.length}`);
for (const [name, unit] of [
  ['흰쌀밥', '반공기'], ['닭가슴살(구이)', '100g'], ['프로틴쉐이크(물)', '1잔'],
  ['그릭요거트(무가당)', '200g'], ['편의점 닭가슴살 샐러드', '1개']
]) {
  if (!foods.some((food) => food.n === name && food.unit === unit)) fail(`diet plan food missing: ${name} ${unit}`);
}

console.log(`FIT TRACKER ${htmlVersion} verified`);
console.log(`- ${inlineScripts.length} inline scripts compile`);
console.log(`- ${localAssets.length} offline assets exist`);
console.log(`- cloud sync, diet, and health modules compile`);
console.log(`- ${foods.length} foods loaded; smart-meal staples exist`);
