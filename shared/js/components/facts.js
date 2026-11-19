import { h } from '../core/dom.js';
import { TEXTS } from '../texts.js';
import { formatDate } from '../core/format.js';

export function Facts(ext) {
  const rows = [
    [TEXTS.factVersion, ext.version],
    [TEXTS.factSize, ext.size],
    [TEXTS.factCategory, ext.category],
    [TEXTS.factRequires, TEXTS.requires(ext.minAndroid || '8.0')],
    [TEXTS.factUpdated, formatDate(ext.updated)],
    [TEXTS.factSigned, TEXTS.signedBy],
  ].filter((row) => row[1]);
  return h('div', { class: 'facts' }, rows.map(([label, value]) => h('div', null, h('span', null, label), h('b', null, value))));
}