import { app, BrowserView, BrowserWindow, ipcMain, Notification, Tray, Menu, clipboard } from 'electron';
import path from 'path';
import { fileURLToPath } from 'node:url'
import { showDialogs } from './dialog';
import processMessage from './processMessage'
import  touchBar  from './touchBar';
import { exec } from 'child_process'
import  os  from 'os'

// let icon: string;
// icns
// switch (process.platform) {
//   case 'win32': icon = path.resolve(__dirname, 'img', 'icon.ico'); break;
//   case 'darwin': icon = path.resolve(__dirname, 'img', './resources/logo-64.png'); break;
//   case 'linux': icon = path.resolve(__dirname, 'img', 'icon.png'); break;
// }
// console.log(icon)

if(process.platform == 'darwin') {
  console.log('跳出软键盘')
  console.log(exec)
  exec('onboard')
} else {
  exec('osk.exe')
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nativeImage = require('electron').nativeImage
let tray: Tray = null
// 禁止多开 判断是否有别的进程
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit();
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const openAboutWindow = require('about-window').default;
const icon = path.join(__dirname, '../../resources/icon.png') // __dirname为主进程执行的同级目录
const logoImg = nativeImage.createFromPath(icon)
const createAboutWin = () => openAboutWindow({
  icon_path: icon,
  // package_json_dir: path.resolve(__dirname, '/../'),
  copyright: 'Copyright (c) 2023 rhysd',
  homepage: 'https://github.com/rhysd/electron-about-window',
  // open_devtools: process.env.NODE_ENV !== 'production'
})
// const __filename = fileURLToPath(import.meta.url)
// console.log(import.meta)

const setTray = () => {
  tray = new Tray(logoImg)
  tray.on('right-click', () => {
    const contextMenu = Menu.buildFromTemplate([
      { label: 'about', type: 'radio' },
      { label: '显示', click: createWindow},
      { label: '退出', click: app.quit }
    ])
    tray.setToolTip('This is my application.')
    // tray.setContextMenu(contextMenu)
    tray.popUpContextMenu(contextMenu)
  })

  const clickCallBack = () => {
    //win.show()
    tray.popUpContextMenu()
  }

  if (process.platform === `darwin`) {
    tray.on('mouse-up', clickCallBack)
  } else {
    tray.on('click', clickCallBack)
  }
}

function setAppMenu () {
  const appMenu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [ 
        {
          label: 'About',
          // icon: logoImg,
          click: createAboutWin
        },
        {type: 'separator'}
      ]
    }
  ])
  app.applicationMenu = appMenu
}

// 主项目加载窗口
const createWindow = () => {
  return new Promise((resolve, reject) => {
    const mainWindow = new BrowserWindow({
      width: 1280,
      height: 720,
      fullscreenable: true,
      // fullscreen: true,
      webPreferences: {
        nodeIntegration: true,
        //contextIsolation: false,
        // webSecurity: false,
        preload: path.join(__dirname, 'preload.js'),
      },
      icon: path.join(process.cwd(), "icon", "icon.icns"),
      // useContentSize: true,
      // frame: false,
      // titleBarStyle: 'hiddenInset',
    });

    if(process.platform == 'darwin') {
      app.dock.setIcon(path.join(process.cwd(), "resources", "icon.png"));
    } else {
      mainWindow.setIcon(logoImg)
    }

    let view = new BrowserView()
    mainWindow.setBrowserView(view)
    view.setBounds({ x: 0, y: 0, width: 1280, height: 720 })
    view.webContents.loadFile('loading.html')
    view.webContents.on('dom-ready', () => {
      mainWindow.show()
    })
    mainWindow.once('ready-to-show', () => {
      setTimeout(() => {
        console.log('完成')
        mainWindow.removeBrowserView(view)
      }, 500);

    })
    ipcMain.on('stop-loading-main', () => {
      mainWindow.removeBrowserView(view)
      view = null
    })

    showDialogs(mainWindow)
   // mainWindow.setTouchBar(touchBar)

    //    // 主线程和渲染进程通信 
    // const ProcessMessage = new processMessage(mainWindow)
    // ProcessMessage.init()

    ipcMain.on("winMinimize", () => {
      mainWindow.minimize();
    })
    ipcMain.on("winMaximize", () => {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.minimize();
      }
    })
    ipcMain.on("winClose", () => {
      mainWindow.close();
    })

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
      mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    }

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  });
};

app.on("ready", async () => {
  setTray();
  setAppMenu()
  await createWindow();
});
// app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
