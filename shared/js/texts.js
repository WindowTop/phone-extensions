// Every UI string of the site lives here (rule: phone-extensions-site). Components and pages never contain text.

export const TEXTS = {
  siteName: 'WindowTop',
  siteSubtitle: 'Phone extensions',
  listTitle: 'Phone extensions',
  listLead: 'Android apps that extend WindowTop widgets on your PC.',
  searchPlaceholder: 'Search extensions...',
  allCategory: 'All',
  noResults: 'No extensions found.',
  loadFailed: 'The list of extensions could not be loaded. Please try again later.',
  footer: 'Downloads are signed APK files. Android may ask you to allow installing from this source.',

  view: 'View',
  download: 'Download',
  comingSoon: 'Coming soon',
  back: '\u2190 All extensions',
  devTag: 'DEV',
  platformBadge: 'Android',
  androidRequires: (v) => 'Android ' + v + '+',

  devListBanner: 'Development mode: the list also shows development extensions. They work only with WindowTop debug builds and are not for users.',
  devPageBanner: 'Development extension. It works only with WindowTop debug builds and is not for users.',
  fromWindowTopTip: 'You came from WindowTop. Download and install the app, open it, then approve your Android phone in the WindowTop dialog.',

  screenshots: 'Screenshots',
  onWindowTop: 'On WindowTop',
  onPhone: 'On your Android phone',
  shotLabels: {
    desktop: 'On the desktop',
    taskbar: 'On the taskbar (hover)',
  },

  description: 'Description',
  factVersion: 'Version',
  factSize: 'Size',
  factCategory: 'Category',
  factRequires: 'Requires',
  factUpdated: 'Updated',
  factSigned: 'Signed by',
  signedBy: 'WindowTop',
  requires: (androidVersion) => 'WindowTop on Windows 11, Android ' + androidVersion + '+, Bluetooth',

  qrTitle: 'Scan with your Android phone',
  qrText: (name, version) => name + ' ' + version + ' is an Android app. Scan the code with your Android phone to open this page there and download it.',
  qrNote: 'Android phones only.',

  installTitle: 'How to install',
  installSteps: (name) => [
    ['Download', 'Tap the Download button and wait for the file.'],
    ['Allow the install', 'Android may ask to allow installs from your browser. This is normal for apps outside Google Play.'],
    ['Open the app', 'Open ' + name + ' on your Android phone.'],
    ['Pair it', 'In WindowTop, approve your Android phone when it asks.'],
  ],

  accessTitle: 'What it can access',
  noInternetTitle: 'No internet access',
  noInternetText: 'The app has no permission to use the internet.',

  notFoundTitle: 'Extension not found',
  notFoundText: (id) => 'There is no extension called "' + id + '".',
  notFoundHome: 'All extensions',
};

// Android permission name (without "android.permission.") to a title and a plain sentence.
// Several permissions can share a title; the page shows each title once.
export const PERMISSION_TEXTS = {
  BLUETOOTH_CONNECT: ['Bluetooth', 'Talks to WindowTop on your PC. Nothing goes through the internet.'],
  BLUETOOTH: ['Bluetooth', 'Talks to WindowTop on your PC. Nothing goes through the internet.'],
  BLUETOOTH_ADMIN: ['Bluetooth', 'Talks to WindowTop on your PC. Nothing goes through the internet.'],
  BLUETOOTH_SCAN: ['Bluetooth', 'Talks to WindowTop on your PC. Nothing goes through the internet.'],
  POST_NOTIFICATIONS: ['Notifications', 'Shows messages sent from the PC.'],
  FOREGROUND_SERVICE: ['Runs in the background', 'Keeps the link alive when the app is closed.'],
  FOREGROUND_SERVICE_CONNECTED_DEVICE: ['Runs in the background', 'Keeps the link alive when the app is closed.'],
  RECEIVE_BOOT_COMPLETED: ['Starts with the phone', 'Reconnects to your PC after the phone restarts.'],
  VIBRATE: ['Vibration', 'Vibrates the phone while it rings.'],
  MODIFY_AUDIO_SETTINGS: ['Sound volume', 'Raises the alarm volume while the phone rings, then puts it back.'],
  USE_FULL_SCREEN_INTENT: ['Alert over the lock screen', 'Shows the Stop screen on top of the lock screen while the phone rings.'],
};

// Unknown permissions show their raw name.
export function permissionText(name) {
  return PERMISSION_TEXTS[name] || [name, ''];
}
