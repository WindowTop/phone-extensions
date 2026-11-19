import { h } from '../core/dom.js';
import { TEXTS } from '../texts.js';

export function Footer() {
  return h('p', { class: 'footer' }, TEXTS.footer);
}