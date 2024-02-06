import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
[x: string]: any
      electron: string,
      node: string,
      chrome: string,
      setTitle: (value: string) => void,
      showMessage: (text: string) => void,
      showErrorMessage: (value: string, content: any) => void,
      showNote: (title: string, body: any) => void,
      createAboutWin: () => void
    }
  }
}
