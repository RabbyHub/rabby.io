import { LINKS, ICONS } from '../../constants/links';

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
    href: LINKS.DOWNLOAD.MACOS_INTEL,
    type: MACOS_ARCH.INTEL
  },
  [MACOS_ARCH.APPLE_SILICON]: {
    title: "macOS M-Series",
    href: LINKS.DOWNLOAD.MACOS_APPLE_SILICON,
    type: MACOS_ARCH.APPLE_SILICON
  },
}

export const DESKTOP_DOWNLOAD_INFO = {
  macos: {
    title: "macOS",
    icon: ICONS.DOWNLOAD.MACOS,
    href: "",
  },
  windows: {
    title: "Windows",
    icon: ICONS.DOWNLOAD.WINDOWS,
    href: LINKS.DOWNLOAD.WINDOWS,
  },
}

export const DOWNLOAD_INFO_MOBILE = {
  appStore: {
    title: "AppStore",
    icon: ICONS.DOWNLOAD.APP_STORE,
    qrCode: ICONS.QR_CODES.APP_STORE,
    href: LINKS.DOWNLOAD.APP_STORE
  },
  googlePlay: {
    title: "Google Play",
    icon: ICONS.DOWNLOAD.GOOGLE_PLAY,
    qrCode: ICONS.QR_CODES.GOOGLE_PLAY,
    href: LINKS.DOWNLOAD.GOOGLE_PLAY,
  }
}

export const BROWSER_DOWNLOAD_INFO = {
  chrome: {
    title: "Chrome",
    icon: ICONS.DOWNLOAD.CHROME,
    href: LINKS.DOWNLOAD.CHROME,
    type: DownloadType.BROWSER
  },
  brave: { 
    title: "Brave",
    icon: ICONS.DOWNLOAD.BRAVE,
    href: LINKS.DOWNLOAD.BRAVE,
    type: DownloadType.BROWSER
  },
  edge: {
    title: "Edge",
    icon: ICONS.DOWNLOAD.EDGE,
    href: LINKS.DOWNLOAD.EDGE,
    type: DownloadType.BROWSER
  },
}

// 保留原有的 DOWNLOAD_INFO 以兼容现有代码
export const DOWNLOAD_INFO = {
    chrome: {
      title: "Chrome",
      icon: "/assets/download/chrome.svg",
      href: LINKS.DOWNLOAD.CHROME,
      type: DownloadType.BROWSER
    },
    brave: { 
      title: "Brave",
      icon: "/assets/download/brave.svg",
      href: LINKS.DOWNLOAD.BRAVE,
      type: DownloadType.BROWSER
    },
    edge: {
      title: "Edge",
      icon: "/assets/download/edge.svg",
      href: LINKS.DOWNLOAD.EDGE,
      type: DownloadType.BROWSER
    },
    appStore: {
      title: "AppStore",
      icon: "/assets/download/app-store.svg",
      href: LINKS.DOWNLOAD.APP_STORE,
      type: DownloadType.APP
    },
    googlePlay: {
      title: "Google Play",
      icon: "/assets/download/google-play.svg",
      href: LINKS.DOWNLOAD.GOOGLE_PLAY,
      type: DownloadType.APP
    },
    macos: {
      title: "Mac",
      icon: "/assets/download/apple.svg",
      href: LINKS.DOWNLOAD.MACOS_INTEL,
      type: DownloadType.DESKTOP
    },
    windows: {
      title: "Windows",
      icon: "/assets/download/windows.svg",
      href: LINKS.DOWNLOAD.WINDOWS,
      type: DownloadType.DESKTOP
    }
}