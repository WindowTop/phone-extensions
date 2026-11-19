// Hardcoded list of phone extensions. Update this file when a new version is released.
// The deploy-phone-extension script updates version, size and url of an entry (found by id) after it publishes a release.
// id  = extension name = widget id; tag shared-clipboard-2.4, file shared-clipboard-2.4-android.apk.
// dev = true: development extension, listed only when the page is opened with ?dev (PROTOCOL.md Channel `dev`).
// url = direct APK download link (GitHub release asset of WindowTop/phone-extensions). Use null while there is no release yet.
const EXTENSIONS = [
  {
    id: "shared-clipboard",
    name: "Shared Clipboard",
    category: "Productivity",
    description: "Share the clipboard between your phone and your PC.",
    version: "2.4",
    size: "6.8 MB",
    url: "https://github.com/WindowTop/Phone-SharedClipboard/releases/download/v2.4/Phone-SharedClipboard-2.4.apk"
  },
  {
    id: "test-app",
    dev: true,
    name: "Test App",
    category: "Developer",
    description: "Test extension used to try the phone extension connection.",
    version: "1.0",
    size: "6.4 MB",
    url: "https://github.com/WindowTop/phone-extensions/releases/download/test-app-1.0/test-app-1.0-android.apk"
  }
];
