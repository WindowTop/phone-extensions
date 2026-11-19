import { h } from '../core/dom.js';

export function Section({ title, className }, ...children) {
  return h('section', { class: className ? 'section ' + className : 'section' }, title ? h('h3', null, title) : null, ...children);
}