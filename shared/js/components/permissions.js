import { h } from '../core/dom.js';
import { TEXTS, permissionText } from '../texts.js';

// One row per distinct title. "No internet access" is derived when INTERNET is not requested.
export function Permissions(ext) {
  const seen = new Set();
  const rows = [];
  for (const name of ext.permissions || []) {
    const [title, text] = permissionText(name);
    if (seen.has(title)) continue;
    seen.add(title);
    rows.push(h('div', null, h('b', null, title), text));
  }
  if (!(ext.permissions || []).includes('INTERNET')) {
    rows.push(h('div', { class: 'ok' }, h('b', null, TEXTS.noInternetTitle), TEXTS.noInternetText));
  }
  return h('div', { class: 'perm' }, rows);
}