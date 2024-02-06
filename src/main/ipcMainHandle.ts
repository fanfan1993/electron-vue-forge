import { BrowserWindow, dialog, Notification, ipcMain } from 'electron'
import { ElectronEvent } from '../renderer/utils/enums'
ipcMain.handle(ElectronEvent.OpenWin, (_, arg) => {
    const childWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        childWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
      } else {
        // childWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
      }
})