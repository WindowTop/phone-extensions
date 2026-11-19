import { h } from '../core/dom.js';
import { TEXTS } from '../texts.js';
import { siteState } from '../core/site-state.js';
import { extensionPath } from '../core/router.js';
import { Icon } from './icon.js';
import { DevTag } from './pill.js';
import { Button } from './button.js';

// The whole card is a link to the extension page; the View button is only its visible hint.
export function ExtensionCard(ext) {
  const meta = [ext.category, ext.version ? 'v' + ext.version : '', ext.size].filter(Boolean).join(' \u00b7 ');
  return h(
    'a',
    { class: 'card', href: siteState.url(extensionPath(ext.id)) },
    h(
      'div',
      { class: 'head' },
      Icon(ext, 's'),
      h('div', null, h('h2', null, ext.name, ext.dev ? DevTag() : null), h('p', { class: 'desc' }, ext.description), h('p', { class: 'meta' }, meta)),
    ),
    h('span', { class: 'btn primary' }, TEXTS.view),
  );
}