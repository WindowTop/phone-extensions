import { h } from '../core/dom.js';

// kind: 'dev' (development warning) or 'tip' (hint for the visitor).
export function Banner({ kind, text }) {
  return h('div', { class: 'banner ' + kind }, text);
}