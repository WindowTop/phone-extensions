import { h } from '../core/dom.js';

// Button or link button. kind: 'primary' (default) or 'secondary'. Disabled renders a plain span.
export function Button({ text, href, kind = 'primary', big, block, disabled, onclick }) {
  const cls = ['btn', kind === 'primary' ? 'primary' : '', big ? 'big' : '', block ? 'block' : '', disabled ? 'disabled' : '']
    .filter(Boolean)
    .join(' ');
  if (disabled) return h('span', { class: cls }, text);
  return h(href ? 'a' : 'button', { class: cls, href, onclick }, text);
}