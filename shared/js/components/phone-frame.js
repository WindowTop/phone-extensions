import { h } from '../core/dom.js';

export function PhoneFrame(child) {
  return h('div', { class: 'phone-frame' }, child);
}