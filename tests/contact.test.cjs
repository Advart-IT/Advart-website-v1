const { test } = require('node:test');
const assert = require('node:assert/strict');
const ts = require('typescript');
const vm = require('node:vm');
const fs = require('node:fs');
const source = ts.transpileModule(fs.readFileSync('app/api/contact/route.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
const valid = { firstName: ' Test ', business: 'Brand & Co', email: 'test@example.com', phone: '+91 12345 67890', reason: 'web', message: 'Hello' };
function harness(status = 201, token = 'test-token', body = { success: true }) {
  const calls = [];
  const logs = [];
  const exports = {};
  vm.runInNewContext(source, { exports, require, process: { env: { CONTACT_API_TOKEN: token, NODE_ENV: 'development' } }, console: { error() {}, info(...args) { logs.push(args); } }, AbortSignal, Error,
    fetch: async (...args) => { calls.push(args); if (status === 'timeout') throw new Error('timeout'); return { ok: status >= 200 && status < 300, status, text: async () => typeof body === 'string' ? body : JSON.stringify(body) }; }
  });
  return { calls, logs, post: body => exports.POST(new Request('http://localhost/api/contact', { method: 'POST', body: typeof body === 'string' ? body : JSON.stringify(body) })) };
}
test('forwards exact API fields and server-only authentication', async () => {
  const h = harness();
  assert.equal((await h.post(valid)).status, 200);
  const [url, options] = h.calls[0];
  assert.equal(url, 'https://tasks.advartit.in/api/v1/contact-enquiries');
  assert.equal(options.headers['X-Contact-Token'], 'test-token');
  assert.equal(options.headers['Content-Type'], 'application/json');
  assert.deepEqual(JSON.parse(options.body), { name: 'Test', business_name: 'Brand & Co', email: valid.email, phone: valid.phone, purpose: 'web', message: 'Hello' });
});
test('invalid inputs never reach upstream', async () => {
  for (const body of ['{', null, { ...valid, firstName: 123 }, { ...valid, email: 'bad' }, { ...valid, business: {} }]) {
    const h = harness(); assert.equal((await h.post(body)).status, 400); assert.equal(h.calls.length, 0);
  }
});
test('missing configuration, upstream failures and timeouts do not report success', async () => {
  assert.equal((await harness(201, '').post(valid)).status, 503);
  for (const status of [401, 422, 500, 'timeout']) {
    const response = await harness(status).post(valid);
    assert.equal(response.status, status === 'timeout' ? 502 : status); assert.equal((await response.json()).success, false);
  }
});

test('upstream service unavailable is reported without exposing backend details', async () => {
  const response = await harness(503).post(valid);
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { success: false, error: 'service_unavailable' });
});

 test('successful HTTP responses with errors or invalid JSON never confirm success', async () => {
  for (const body of [{ success: false }, { error: 'rejected' }, { errors: { email: ['invalid'] } }, '<html>Error</html>']) {
    const response = await harness(200, 'test-token', body).post(valid);
    assert.equal(response.status, 502);
    assert.equal((await response.json()).success, false);
  }
});
test('preserves upstream error statuses without reflecting secrets or personal data', async () => {
  for (const status of [400, 401, 403, 422, 429, 500, 502, 503, 504]) {
    const response = await harness(status, 'test-token', { message: 'CONTACT_FORM_TOKEN is not set on the server', secret: 'test-token' }).post(valid);
    assert.equal(response.status, status);
    const body = await response.text();
    assert.equal(body.includes('test-token'), false);
    assert.equal(body.includes('CONTACT_FORM_TOKEN'), false);
  }
});
test('HTTP 204 confirms acceptance without a JSON body', async () => {
  assert.deepEqual(await (await harness(204, 'test-token', '').post(valid)).json(), { success: true });
});

test('development diagnostics allowlist the backend configuration error and status', async () => {
  const h = harness(500, 'test-token', { message: 'CONTACT_FORM_TOKEN is not set on the server', token: 'test-token', email: valid.email });
  await h.post(valid);
  assert.equal(h.logs[0][1].upstreamStatus, 500);
  assert.equal(h.logs[0][1].diagnostic, 'CONTACT_FORM_TOKEN is not set on the server');
  assert.equal(JSON.stringify(h.logs).includes('test-token'), false);
  assert.equal(JSON.stringify(h.logs).includes(valid.email), false);
});
