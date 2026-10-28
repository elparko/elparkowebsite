import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

test('each Mac app has its own name, slug, and email', async () => {
  const { APPS, isContactEmailReady } = await import('../lib/mac-app.mjs');

  assert.deepEqual(APPS.rowlight, {
    name: 'Rowlight',
    slug: 'rowlight',
    email: 'rowlight@proton.me',
    privacyPath: '/apps/rowlight/privacy',
    supportPath: '/apps/rowlight/support',
  });
  assert.deepEqual(APPS.quillmath, {
    name: 'Quill Math',
    slug: 'quillmath',
    email: 'quillmath@proton.me',
    privacyPath: '/apps/quillmath/privacy',
    supportPath: '/apps/quillmath/support',
  });

  for (const app of Object.values(APPS)) {
    assert.equal(isContactEmailReady(app.email), true);
  }
  assert.equal(isContactEmailReady('TODO'), false);
  assert.doesNotMatch(read('lib/mac-app.mjs'), /TODO/);
  assert.doesNotMatch(read('components/SupportEmail.js'), /TODO/);
});

test('privacy and support pages use that app config', async () => {
  const { APPS } = await import('../lib/mac-app.mjs');

  for (const app of Object.values(APPS)) {
    const privacyFile = `pages/apps/${app.slug}/privacy.js`;
    const supportFile = `pages/apps/${app.slug}/support.js`;
    assert.equal(existsSync(new URL(`../${privacyFile}`, import.meta.url)), true);
    assert.equal(existsSync(new URL(`../${supportFile}`, import.meta.url)), true);

    const privacy = read(privacyFile);
    const support = read(supportFile);
    for (const source of [privacy, support]) {
      assert.match(source, new RegExp(`APPS\\.${app.slug}`));
      assert.match(source, /SupportEmail/);
      assert.doesNotMatch(source, /TODO/);
      assert.doesNotMatch(source, new RegExp(app.email.replace('.', '\\.')));
      assert.doesNotMatch(source, new RegExp(app.name));
    }
    assert.match(privacy, /October 24, 2026/);
    assert.match(privacy, /children/i);
  }

  const rowlightPrivacy = read('pages/apps/rowlight/privacy.js');
  for (const fact of [/account/i, /analytics/i, /tracking/i, /ads/i, /iCloud/, /image/i]) {
    assert.match(rowlightPrivacy, fact);
  }
  const rowlightSupport = read('pages/apps/rowlight/support.js');
  for (const fact of [/highlight/i, /PDF/, /iCloud/, /Mac/]) {
    assert.match(rowlightSupport, fact);
  }

  const quillPrivacy = read('pages/apps/quillmath/privacy.js');
  for (const fact of [/account/i, /analytics/i, /network/i, /local/i, /LaTeX/, /graphing/]) {
    assert.match(quillPrivacy, fact);
  }
  const quillSupport = read('pages/apps/quillmath/support.js');
  for (const fact of [/LaTeX/, /graph/, /document/i, /account/i, /analytics/i, /network/i]) {
    assert.match(quillSupport, fact);
  }
});

test('app pages stay off the homepage nav and are linked from the tools page', () => {
  const home = read('pages/index.js');
  const tools = read('pages/tools.js');
  const pages = read('lib/pages.mjs');
  assert.doesNotMatch(home, /\/apps\//);
  assert.doesNotMatch(pages, /\/apps\/rowlight|\/apps\/quillmath/);
  assert.match(tools, /mac-app/);
  assert.match(tools, /APPS\.rowlight\.privacyPath/);
  assert.match(tools, /APPS\.rowlight\.supportPath/);
  assert.match(tools, /id="pcalc"/);
  assert.match(tools, /APPS\.quillmath\.privacyPath/);
  assert.match(tools, /APPS\.quillmath\.supportPath/);
  assert.match(tools, /APPS\.quillmath\.name/);
});
