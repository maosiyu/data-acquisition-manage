// 全局异常捕获
require('./src/main/js/common/tools/GlobalException');
const path = require('path');
const ipcMain = require('electron').ipcMain;
const MainWindow = require('./src/main/js/common/core/MainWindow');
const mMainWindow = new MainWindow();

const url = path.join('file://', __dirname, './src/main/js/controller/controller.html');
mMainWindow.open(url);