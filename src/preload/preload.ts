// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
// 桥接的用法 在preload.js 中运行
import { contextBridge, ipcRenderer } from 'electron'
// import { electronAPI } from '@electron-toolkit/preload'
// eslint-disable-next-line import/no-unresolved
import { ElectronEvent } from '../renderer/utils/enums'
import path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const openAboutWindow = require('about-window').default;
const createAboutWin = () => openAboutWindow( { 
  // icon_path: path.join(__dirname, 'icon')
  icon_path: path.join(__dirname, '../assets/images/logo.png'),
  package_json_dir: path.resolve(__dirname, '/../../../'),
  copyright: 'Copyright (c) 2023 rhysd',
  homepage:'https://github.com/rhysd/electron-about-window',
  open_devtools: process.env.NODE_ENV !== 'production'
})
const api = {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
    setTitle: (title: string) => ipcRenderer.send(ElectronEvent.SetTitle, title),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // onUpdateCounter: (callback: any) => ipcRenderer.on('update-counter', (_event, value) => callback(value)),
    // counterValue: (value: number) => ipcRenderer.send('counter-value', value),
    showMessage: (text: string) => ipcRenderer.send(ElectronEvent.showMessageDialog, text),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    showErrorMessage: (text: string, content: any) => ipcRenderer.send(ElectronEvent.ShowErrorDialog, text, content),
    showNote: (text: string, body: any) => ipcRenderer.send(ElectronEvent.ShowNote, text, body),
    createAboutWin: createAboutWin
}
const electronAPI = {
    node: () => { return process.versions.node },
    chrome: () => {return process.versions.chrome },
    electron: () => { return process.versions.electron },
    ping: () => ipcRenderer.invoke('ping')
}

window.addEventListener('DOMContentLoaded', () => {
    console.log(process.contextIsolated)
    // const replaceText = (selector: string, text: string) => {
    //     const element = document.getElementById(selector)
    //     if (element) element.innerText = text
    // }
    // for (const dependency of ['chrome', 'node', 'electron']) {
    //     replaceText(`${dependency}-version`, process.versions[dependency])
    // }
    if (process.contextIsolated) {
        try {
            contextBridge.exposeInMainWorld('electron', electronAPI)
            contextBridge.exposeInMainWorld('api', api)
        } catch (error) {
            console.error(error)
        }
    } else {
        // eslint-disable-next-line import/no-unresolved
        window.electron = electronAPI
        window.api = api
    }


    // const counter = document.getElementById('counter')
    // ipcRenderer.on('update-counter', (_event, value) => {
    //     const oldValue = Number(counter.innerText)
    //     const newValue = oldValue + value
    //     counter.innerText = newValue
    // })

    // const setButton = document.getElementById('btn')
    // const titleInput = document.getElementById('title')
    // setButton.addEventListener('click', () => {
    //     const title = titleInput.value
    //     ipcRenderer.send('update-counter', (_event, value) => {
    //         // window.electronAPI.setTitle(title)
    //     })

    // })

})

