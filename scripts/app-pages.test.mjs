import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('Mac app name, contact, and stable URLs live in one module', async () => {
  const app = await import('../lib/mac-app.mjs');
  assert.equal(typeof app.APP_NAME, 'string');
  assert.ok(app.APP_NAME.trim().length > 0);
  assert.equal(app.APP_SLUG, 'rowlight');
  assert.equal(app.privacyPath, '/apps/rowlight/privacy');
  assert.equal(app.supportPath, '/apps/rowlight/support');
  assert.equal(app.SUPPORT_EMAIL, 'rowlight@proton.me');
  assert.equal(app.isContactEmailReady('TODO'), false);
  assert.equal(app.isContactEmailReady(app.SUPPORT_EMAIL), true);
  assert.doesNotMatch(read('lib/mac-app.mjs'), /TODO/);
  assert.doesNotMatch(read('components/SupportEmail.js'), /TODO/);
  assert.doesNotMatch(read('pages/apps/rowlight/privacy.js'), /TODO/);
  assert.doesNotMatch(read('pages/apps/rowlight/support.js'), /TODO/);
});

test('privacy and support pages use the shared name and cover the required facts', async () => {
  const { APP_SLUG } = await import('../lib/mac-app.mjs');
  const privacyFile = `pages/apps/${APP_SLUG}/privacy.js`;
  const supportFile = `pages/apps/${APP_SLUG}/support.js`;
  assert.equal(existsSync(new URL(`../${privacyFile}`, import.meta.url)), true);
  assert.equal(existsSync(new URL(`../${supportFile}`, import.meta.url)), true);

  const privacy = read(privacyFile);
  const support = read(supportFile);
  for (const source of [privacy, support]) {
    assert.match(source, /APP_NAME/);
    assert.doesNotMatch(source, /Rowlight|FA Reader/);
    assert.match(source, /SUPPORT_EMAIL|SupportEmail/);
  }

  assert.match(privacy, /October 24, 2026/);
  for (const fact of [/account/i, /analytics/i, /tracking/i, /ads/i, /iCloud/, /children/i, /image/i]) {
    assert.match(privacy, fact);
  }

  for (const fact of [/highlight/i, /PDF/, /iCloud/, /Mac/]) {
    assert.match(support, fact);
  }
});

test('app pages stay off the homepage nav and are linked from the tools page', () => {
  const home = read('pages/index.js');
  const tools = read('pages/tools.js');
  const pages = read('lib/pages.mjs');
  assert.doesNotMatch(home, /\/apps\//);
  assert.doesNotMatch(pages, /privacyPath|supportPath|\/apps\/rowlight/);
  assert.match(tools, /mac-app/);
  assert.match(tools, /privacyPath/);
  assert.match(tools, /supportPath/);
  assert.match(tools, /APP_NAME/);
});
