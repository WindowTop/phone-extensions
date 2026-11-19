import { h } from '../core/dom.js';

// items: [[title, text], ...]
export function Steps(items) {
  return h('ol', { class: 'steps' }, items.map(([title, text]) => h('li', null, h('b', null, title), text)));
}