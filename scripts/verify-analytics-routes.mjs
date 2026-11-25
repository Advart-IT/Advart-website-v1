import assert from 'node:assert/strict';
import http from 'node:http';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';

// Read-only SSR integration against an isolated public-job fixture, never the live recruiting API.
const require = createRequire(import.meta.url);
const role = { id: 42, title: 'Fixture Designer', Role: 'Design', experience: '2', location: 'Test office', employment_type: 'Full time', salary: 0, job_description: '<p>Public fixture description</p>', requirements: '', responsibilities: '', status: 'open' };
const upstream = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if (req.method === 'GET' && req.url === '/roles/open') res.end(JSON.stringify([role]));
  else { res.statusCode = 405; res.end('{}'); }
});
await new Promise(resolve => upstream.listen(0, '127.0.0.1', resolve));
const probe = http.createServer();
await new Promise(resolve => probe.listen(0, '127.0.0.1', resolve));
const port = probe.address().port;
await new Promise(resolve => probe.close(resolve));
const server = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'start', '-p', String(port), '-H', '127.0.0.1'], {
  windowsHide: true,
  stdio: ['ignore', 'pipe', 'pipe'],
  env: { ...process.env, ADVART_API_BASE_URL: `http://127.0.0.1:${upstream.address().port}`, ADVART_API_KEY: 'local-fixture-only' },
});
let startupError;
server.on('error', error => { startupError = error; });
// Drain output without exposing environment or upstream diagnostics.
server.stdout.on('data', () => {}); server.stderr.on('data', () => {});
const base = `http://127.0.0.1:${port}`;
try {
  let ready = false;
  for (let i = 0; i < 60; i++) {
    if (startupError) throw startupError;
    try { ready = (await fetch(base, { signal: AbortSignal.timeout(1000) })).ok; } catch { /* wait for startup */ }
    if (ready) break;
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  assert(ready, 'production server must start');
  const roles = await fetch(`${base}/api/roles`);
  assert.equal(roles.status, 200); assert.equal((await roles.json())[0].id, 42);
  for (const [route, tokens] of [
    ['/careers', ['data-track-view="job_listing_view"', 'data-track-event="job_apply_click"', 'data-track-form="open_application"']],
    ['/careers/42-fixture-designer/apply', ['data-track-view="job_detail_view"', 'data-track-job="42"', 'data-track-form="job_application"', 'data-clarity-mask="true"']],
  ]) {
    const response = await fetch(base + route); assert.equal(response.status, 200, route);
    const html = await response.text(); for (const token of tokens) assert(html.includes(token), `${route}: ${token}`);
    console.log(`PASS ${route}: fixture-backed SSR and tracking attributes`);
  }
  console.log('PASS /api/roles: isolated upstream; no applications submitted');
} finally {
  server.kill(); upstream.closeAllConnections(); await new Promise(resolve => upstream.close(resolve));
}
