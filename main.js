const { app, BrowserWindow } = require('electron');
const path = require('path');

// 保持一个对window对象的全局引用，如果不这样做，
// 当JavaScript对象被垃圾回收时，window对象将自动关闭
let mainWindow;

function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  // 加载index.html
  mainWindow.loadFile('index.html');

  // 打开开发者工具（可选）
  // mainWindow.webContents.openDevTools();

  // 当window被关闭，这个事件会被触发
  mainWindow.on('closed', function () {
    // 取消引用window对象，如果你的应用支持多窗口的话，
    // 通常会把多个window对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素
    mainWindow = null;
  });
}

// 当Electron完成初始化并准备创建浏览器窗口时，
// 这个方法将会被调用。
// 一些API只能在这个事件发生后使用。
app.whenReady().then(createWindow);

// 当所有窗口都被关闭时退出
app.on('window-all-closed', function () {
  // 在macOS上，用户通常会通过Cmd + Q显式退出应用
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
  // 在macOS上，当点击dock图标并且没有其他窗口打开时，
  // 通常会在应用程序中重新创建一个窗口。
  if (mainWindow === null) createWindow();
});