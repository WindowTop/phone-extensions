import { h } from '../core/dom.js';
import { TEXTS } from '../texts.js';
import { siteState } from '../core/site-state.js';
import { LIST_PATH } from '../core/router.js';

export function TopBar() {
  return h('div', { class: 'top-bar' }, h('a', { href: siteState.url(LIST_PATH) }, TEXTS.siteName, h('span', null, TEXTS.siteSubtitle)));
}