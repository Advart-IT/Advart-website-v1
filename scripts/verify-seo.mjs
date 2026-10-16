import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const base = process.env.SEO_BASE_URL || 'http://127.0.0.1:3001';
const canonical = 'https://www.advartit.in';
const get = async (path) => {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200, path);
  return response.text();
};
const sitemap = await get('/sitemap.xml');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
assert.equal(new Set(urls).size, urls.length);
const titles = new Set();
for (const url of urls) {
  assert.ok(url.startsWith(`${canonical}/`) && !url.includes('AdvartGen'));
  const path = new URL(url).pathname;
  const html = await get(path);
  const tags = [...html.matchAll(/<title>(.*?)<\/title>/g)];
  assert.equal(tags.length, 1, `${path}: one title`);
  assert.ok(!titles.has(tags[0][1]), `${path}: unique title`);
  titles.add(tags[0][1]);
  const canonicalTags = [...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)];
  assert.equal(canonicalTags.length, 1, `${path}: one canonical`);
  assert.equal(new URL(canonicalTags[0][1]).href, new URL(url).href, `${path}: canonical`);
  assert.ok(html.includes('name="description"'));
  assert.ok(html.includes('property="og:image"'));
  assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
  assert.ok(!html.includes('name="keywords"'));
  assert.ok(!/<meta[^>]*content="[^"]*noindex/.test(html));
  console.log(`PASS ${path}: response, title, canonical, description and social metadata`);
}
const home = await get('/');
assert.equal((home.match(/<h1[\s>]/g) || []).length, 1);
assert.ok(home.includes('href="/advartgen"'));
assert.ok(home.includes('id="services"'));
assert.ok(home.includes('Data-driven performance marketing for ecommerce growth'));
assert.ok(home.includes('managed image-production workflow'));
const scripts = [...home.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)];
assert.equal(scripts.length, 1);
const graph = JSON.parse(scripts[0][1])['@graph'];
assert.equal(graph.length, 4);
const ids = new Set(graph.map(entity => entity['@id']));
assert.equal(ids.size, graph.length);
for (const entity of graph) {
  assert.ok(entity.name && entity.url);
  if (entity.provider) assert.ok(ids.has(entity.provider['@id']));
}
assert.equal(graph.filter(entity => entity['@type'] === 'Service').length, 2);
assert.equal(graph.find(entity => entity.name === 'Advart Gen').alternateName, 'AdvartGen');
const robots = await get('/robots.txt');
assert.ok(robots.includes(`Host: ${canonical}`));
assert.ok(robots.includes(`Sitemap: ${canonical}/sitemap.xml`));
assert.ok(robots.includes(`Sitemap: ${canonical}/advartgen/sitemap.xml`));
assert.ok(robots.includes('Allow: /') && !robots.includes('Disallow: /'));
const image = await readFile(new URL('../public/social-preview.png', import.meta.url));
assert.equal(image.readUInt32BE(16), 1200);
assert.equal(image.readUInt32BE(20), 630);
await get('/social-preview.png');
await get('/logo-1.png');
console.log('PASS homepage SSR content, H1, links, JSON-LD structure/references, robots and 1200x630 social image');
