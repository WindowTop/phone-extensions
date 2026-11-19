import { h } from '../core/dom.js';
import { TEXTS } from '../texts.js';
import { Button } from './button.js';

// Android visitors: fixed bar at the bottom, name and version centered, full-width Download (text only).
export function DownloadBar(ext) {
  return h(
    'div',
    { class: 'download-bar' },
    h('div', { class: 'who' }, h('b', null, ext.name), h('span', null, ext.version)),
    ext.url
      ? Button({ text: TEXTS.download, href: ext.url, big: true, block: true })
      : Button({ text: TEXTS.comingSoon, big: true, block: true, disabled: true }),
  );
}