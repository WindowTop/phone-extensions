import { h } from '../core/dom.js';
import { TEXTS } from '../texts.js';
import qrcode from '../vendor/qrcode.js';
import { Section } from './section.js';

function qrSvg(url) {
  const qr = qrcode(0, 'M');
  qr.addData(url);
  qr.make();
  const doc = new DOMParser().parseFromString(qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true }), 'image/svg+xml');
  return document.importNode(doc.documentElement, true);
}

// PC and other visitors: no Download button, a QR code of this page (query kept, so a dev QR stays dev).
export function QrBlock(ext, pageUrl) {
  return Section(
    { className: 'install' },
    h(
      'div',
      { class: 'qr-block' },
      h('div', { class: 'qr-code' }, qrSvg(pageUrl)),
      h('div', null, h('h3', null, TEXTS.qrTitle), h('p', null, TEXTS.qrText(ext.name, ext.version)), h('p', { class: 'note' }, TEXTS.qrNote)),
    ),
  );
}