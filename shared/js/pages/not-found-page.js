import { h } from '../core/dom.js';
import { TEXTS } from '../texts.js';
import { siteState } from '../core/site-state.js';
import { LIST_PATH } from '../core/router.js';
import { TopBar } from '../components/top-bar.js';
import { Button } from '../components/button.js';

export function NotFoundPage(id) {
  return h(
    'div',
    { class: 'page' },
    TopBar(),
    h('div', { class: 'not-found' }, h('h1', null, TEXTS.notFoundTitle), h('p', null, TEXTS.notFoundText(id || '')), Button({ text: TEXTS.notFoundHome, href: siteState.url(LIST_PATH) })),
  );
}
