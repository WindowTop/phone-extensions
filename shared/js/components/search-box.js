import { h } from '../core/dom.js';
import { TEXTS } from '../texts.js';

export function SearchBox({ value, onInput }) {
  return h('input', {
    class: 'search',
    type: 'search',
    placeholder: TEXTS.searchPlaceholder,
    value,
    oninput: (event) => onInput(event.target.value),
  });
}