export enum DownloadType {
  BROWSER = "browser",
  APP = "app",
  DESKTOP = "desktop"
}

export enum MACOS_ARCH {
  INTEL = "intel",
  APPLE_SILICON = "apple-silicon"
}

export const MACOS_DOWNLOAD_INFO = {
  [MACOS_ARCH.INTEL]: {
    title: "macOS Intel",
    href: "https://download.rabby.io/wallet-desktop/darwin-x64/rabby-wallet-desktop-installer-x64-latest.dmg",
    type: MACOS_ARCH.INTEL
    },
  [MACOS_ARCH.APPLE_SILICON]: {
    title: "macOS M-Series",
    href: "https://download.rabby.io/wallet-desktop/darwin-arm64/rabby-wallet-desktop-installer-arm64-latest.dmg",
    type: MACOS_ARCH.APPLE_SILICON
  },
}

export const DESKTOP_DOWNLOAD_INFO = {
  macos: {
    title: "macOS",
    icon: "/assets/download/apple.svg",
    href: "",
  },
  windows: {
    title: "Windows",
    icon: "/assets/download/windows-origin.svg",
    href: "https://download.rabby.io/wallet-desktop/win32-x64/rabby-wallet-desktop-installer-x64-latest.exe",
  },
}

export const DOWNLOAD_INFO_MOBILE = {
  appStore: {
    title: "AppStore",
    icon: "/assets/download/app-store-origin.svg",
    qrCode: "/assets/download/app-store-qr.png",
    href: "https://apps.apple.com/us/app/rabby-wallet-crypto-evm/id6474381673"
  },
  googlePlay: {
    title: "Google Play",
    icon: "/assets/download/google-play-origin.svg",
    qrCode: "/assets/download/google-play-qr.png",
    href: "https://play.google.com/store/apps/details?id=com.debank.rabbymobile",
  }
}

export const BROWSER_DOWNLOAD_INFO = {
  chrome: {
    title: "Chrome",
    icon: "/assets/images/chrome.svg",
    href: "https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch",
    type: DownloadType.BROWSER
  },
  brave: { 
    title: "Brave",
    icon: "/assets/images/brave-1.png",
    href: "https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch",
    type: DownloadType.BROWSER
  },
  edge: {
    title: "Edge",
    icon: "/assets/images/edge.svg",
    href: "https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch",
    type: DownloadType.BROWSER
  },
}

export const DOWNLOAD_INFO = {
    chrome: {
      title: "Chrome",
      icon: "/assets/download/chrome.svg",
      href: "https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch",
      type: DownloadType.BROWSER
    },
    brave: { 
      title: "Brave",
      icon: "/assets/download/brave.svg",
      href: "https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch",
      type: DownloadType.BROWSER
    },
    edge: {
      title: "Edge",
      icon: "/assets/download/edge.svg",
      href: "https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch",
      type: DownloadType.BROWSER
    },
    appStore: {
      title: "AppStore",
      icon: "/assets/download/app-store.svg",
      href: "https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch",
      type: DownloadType.APP
    },
    googlePlay: {
      title: "Google Play",
      icon: "/assets/download/google-play.svg",
      href: "https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch",
      type: DownloadType.APP
    },
    macos: {
      title: "Mac",
      icon: "/assets/download/apple.svg",
      href: "https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch",
      type: DownloadType.DESKTOP
    },
    windows: {
      title: "Windows",
      icon: "/assets/download/windows.svg",
      href: "https://chrome.google.com/webstore/detail/rabby/acmacodkjbdgmoleebolmdjonilkdbch",
      type: DownloadType.DESKTOP
    }
}