const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

let mainWindow;
let mouseTimer;
let isMouseVisible = true;

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

  // 加载初始HTML
  mainWindow.loadFile('index.html');

  // 初始隐藏鼠标
  mainWindow.setIgnoreMouseEvents(true);

  // 监听鼠标移动事件
  mainWindow.webContents.on('mouse-move', () => {
    if (!isMouseVisible) {
      mainWindow.setIgnoreMouseEvents(false);
      isMouseVisible = true;
    }

    // 清除之前的定时器
    if (mouseTimer) {
      clearTimeout(mouseTimer);
    }

    // 设置新的定时器，3分钟后隐藏鼠标
    mouseTimer = setTimeout(() => {
      mainWindow.setIgnoreMouseEvents(true);
      isMouseVisible = false;
    }, 3 * 60 * 1000); // 3分钟
  });

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
