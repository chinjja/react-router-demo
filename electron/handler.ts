import { ipcMain } from 'electron';
import SerialPort from 'serialport';

ipcMain.handle('get-device-list', async (event, args) => {
    return await SerialPort.list();
})