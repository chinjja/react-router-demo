import { app, BrowserWindow } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    if(isDev) {
        win.loadURL('http://localhost:3000');
    } else {
        win.loadFile(path.join(__dirname, 'index.html'));
    }
}

app.whenReady().then(createWindow);