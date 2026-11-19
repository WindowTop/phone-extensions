import { DownloadBar } from './download-bar.js';
import { QrBlock } from './qr-block.js';

// The only place where the page differs by platform: pages never branch on it.
export function InstallAction(ext, { android, pageUrl }) {
  return android ? DownloadBar(ext) : QrBlock(ext, pageUrl);
}