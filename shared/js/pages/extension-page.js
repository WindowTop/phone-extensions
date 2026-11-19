// Extension page: composes components only. Block order: header, tip and dev banners, screenshots,
// description with facts, install block (Download bar for Android, QR block for everyone else),
// how to install, what it can access.
import { h } from '../core/dom.js';
import { TEXTS } from '../texts.js';
import { siteState } from '../core/site-state.js';
import { isAndroid } from '../core/platform.js';
import { LIST_PATH } from '../core/router.js';
import { TopBar } from '../components/top-bar.js';
import { ExtensionHeader } from '../components/extension-header.js';
import { Banner } from '../components/banner.js';
import { ScreenshotsSection } from '../components/screenshots.js';
import { Section } from '../components/section.js';
import { Facts } from '../components/facts.js';
import { InstallAction } from '../components/install-action.js';
import { Steps } from '../components/steps.js';
import { Permissions } from '../components/permissions.js';
import { Footer } from '../components/footer.js';

export function ExtensionPage(ext) {
  const android = isAndroid();
  return h(
    'div',
    { class: android ? 'page ext-page with-bar' : 'page ext-page' },
    TopBar(),
    h('a', { class: 'back', href: siteState.url(LIST_PATH) }, TEXTS.back),
    ExtensionHeader(ext),
    siteState.fromWindowTop() ? Banner({ kind: 'tip', text: TEXTS.fromWindowTopTip }) : null,
    ext.dev ? Banner({ kind: 'dev', text: TEXTS.devPageBanner }) : null,
    ScreenshotsSection(ext),
    Section({ className: 'ext-two' }, Section({ title: TEXTS.description }, h('p', { class: 'lead' }, ext.about || ext.description)), Facts(ext)),
    InstallAction(ext, { android, pageUrl: location.href }),
    Section({ title: TEXTS.installTitle }, Steps(TEXTS.installSteps(ext.name))),
    Section({ title: TEXTS.accessTitle }, Permissions(ext)),
    Footer(),
  );
}
