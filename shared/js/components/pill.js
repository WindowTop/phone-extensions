import { h } from '../core/dom.js';
import { TEXTS } from '../texts.js';

export function Pill(text, variant) {
  return h('span', { class: variant ? 'pill ' + variant : 'pill' }, text);
}

export function DevTag() {
  return h('span', { class: 'dev-tag' }, TEXTS.devTag);
}

export function PlatformBadge() {
  return Pill(TEXTS.platformBadge, 'platform');
}