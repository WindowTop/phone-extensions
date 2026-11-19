import { h } from '../core/dom.js';
import { TEXTS } from '../texts.js';

// categories: list of names; active: selected name or null (= All). onSelect(name or null).
export function Chips({ categories, active, onSelect }) {
  const chip = (label, value) =>
    h('button', { class: value === active ? 'chip active' : 'chip', type: 'button', onclick: () => onSelect(value) }, label);
  return h('div', { class: 'chips' }, chip(TEXTS.allCategory, null), categories.map((c) => chip(c, c)));
}