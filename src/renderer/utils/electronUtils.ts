import { ipcRenderer } from "electron"
import { ElectronEvent } from './enums'
// 新建窗口
export function openWindow(path: string) {
    ipcRenderer.invoke(ElectronEvent.OpenWin, path)
}

export default {
    openWindow
}