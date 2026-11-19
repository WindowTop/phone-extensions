// List page: composes components only.
import { h } from '../core/dom.js';
import { TEXTS } from '../texts.js';
import { siteState } from '../core/site-state.js';
import { visible, categories, search } from '../core/store.js';
import { TopBar } from '../components/top-bar.js';
import { Banner } from '../components/banner.js';
import { SearchBox } from '../components/search-box.js';
import { Chips } from '../components/chips.js';
import { ExtensionCard } from '../components/extension-card.js';
import { Footer } from '../components/footer.js';

// Search text and category survive a visit to an extension page and back.
const query = { q: '', category: null };

export function ListPage(extensions) {
  const list = visible(extensions, siteState.isDev());
  const grid = h('div', { class: 'list-grid' });
  const chips = h('div');

  function drawChips() {
    chips.replaceChildren(
      Chips({ categories: categories(list), active: query.category, onSelect: (c) => { query.category = c; drawChips(); drawGrid(); } }),
    );
  }

  function drawGrid() {
    const shown = search(list, query);
    grid.replaceChildren(...(shown.length ? shown.map(ExtensionCard) : [h('p', { class: 'lead' }, TEXTS.noResults)]));
  }

  drawChips();
  drawGrid();

  return h(
    'div',
    { class: 'page' },
    TopBar(),
    siteState.isDev() ? Banner({ kind: 'dev', text: TEXTS.devListBanner }) : null,
    h('h1', { class: 'list-title' }, TEXTS.listTitle),
    h('p', { class: 'lead' }, TEXTS.listLead),
    h('div', { class: 'list-tools' }, SearchBox({ value: query.q, onInput: (v) => { query.q = v; drawGrid(); } }), chips),
    grid,
    Footer(),
  );
}
