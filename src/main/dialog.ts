import { BrowserWindow, dialog, Notification } from 'electron'
// eslint-disable-next-line import/no-unresolved
import { ElectronEvent } from '../renderer/utils/enums'
export function showDialogs (window: BrowserWindow) {
    window.webContents.ipc.on(ElectronEvent.showMessageDialog, (event, message)=> {
        dialog.showMessageBox({message})
    })
    window.webContents.ipc.on(ElectronEvent.ShowErrorDialog, (event, title, content)=> {
        dialog.showErrorBox(title ,content)
    })
    window.webContents.ipc.on(ElectronEvent.ShowNote, (event, title, body)=> {
        // const NOTIFICATION_TITLE = 'Basic Notification'
        // const NOTIFICATION_BODY = 'Notification from the Main process'
        new Notification({ title: title, body: body }).show()
    })
    window.webContents.ipc.on(ElectronEvent.SetTitle, (event, title)=> {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.setTitle(title)
    })
    window.webContents.ipc.on(ElectronEvent.SetIcon, (event, image)=> {
        const webContents = event.sender
        const win = BrowserWindow.fromWebContents(webContents)
        win.setIcon(image)
    })
}