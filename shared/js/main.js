// Bootstrap: load the data, start the router, draw the page of the current route.
import { h, mount } from './core/dom.js';
import { start } from './core/router.js';
import { siteState } from './core/site-state.js';
import { loadExtensions, visible, byId } from './core/store.js';
import { TEXTS } from './texts.js';
import { ListPage } from './pages/list-page.js';
import { ExtensionPage } from './pages/extension-page.js';
import { NotFoundPage } from './pages/not-found-page.js';

const root = document.getElementById('app');
const SITE_TITLE = TEXTS.siteName + ' Phone Extensions';

function draw(extensions, route) {
  siteState.enterRoute(route);
  if (route.name === 'extension') {
    const ext = byId(visible(extensions, siteState.isDev()), route.id);
    if (ext) {
      document.title = ext.name + ' - ' + SITE_TITLE;
      mount(root, ExtensionPage(ext));
      return;
    }
    mount(root, NotFoundPage(route.id));
    document.title = TEXTS.notFoundTitle + ' - ' + SITE_TITLE;
    return;
  }
  if (route.name === 'list') {
    document.title = SITE_TITLE;
    mount(root, ListPage(extensions));
    return;
  }
  document.title = TEXTS.notFoundTitle + ' - ' + SITE_TITLE;
  mount(root, NotFoundPage(route.id));
}

async function main() {
  let extensions = [];
  let failed = false;
  try {
    extensions = await loadExtensions();
  } catch (e) {
    failed = true;
  }
  if (failed) {
    mount(root, h('div', { class: 'page' }, h('p', { class: 'lead' }, TEXTS.loadFailed)));
    return;
  }
  start((route) => draw(extensions, route));
}

main();
