'use strict';
const electron = require('electron');
// 控制应用生命周期的模块。
const app = electron.app;
// 创建原生浏览器窗口的模块
const BrowserWindow = electron.BrowserWindow;

/**
 * 当所有窗口被关闭了，退出。
 */
app.on('window-all-closed', () => {
    // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
    // 应用会保持活动状态
    if (process.platform != 'darwin') {
        app.quit();
        console.info('所有窗口关闭');
    }
});

const MainWindow = function () {
}

// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var win = null;

/**
 * 创建窗体
 * @param callback
 */
MainWindow.prototype.createWindow = function (callback) {
    // 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
    // 这个方法就被调用
    app.on('ready', () => {
        win = new BrowserWindow();
        /**
         * 当前 window 被关闭，这个事件会被发出
         */
        win.on('closed', () => {
            // 取消引用 window 对象，如果你的应用支持多窗口的话，
            // 通常会把多个 window 对象存放在一个数组里面，
            // 但这次不是。
            win = null;
            console.info('窗口关闭');
        });
        callback();
    });
};

/**
 * 打开窗体
 * @param url
 */
MainWindow.prototype.open = function (url) {
    MainWindow.prototype.createWindow(() => {
        // 可以是本地的html 也可以是 http://www.baidu.com
        win.loadURL(url);
        // 全屏显示
        win.maximize();
        // 打开开发工具
        win.openDevTools();
    });
};

module.exports = MainWindow;