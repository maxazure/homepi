const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  // 获取主屏幕尺寸
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width,
    height,
    frame: false,             // 可选：无边框窗口（更像 kiosk 模式）
    autoHideMenuBar: true,    // 可选：隐藏菜单栏
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('index.html');
  mainWindow.webContents.reloadIgnoringCache();

  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) createWindow();
});
