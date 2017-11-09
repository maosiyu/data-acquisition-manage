/**
 * Created by mao_siyu on 2017/4/21.
 */
const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
// 窗体池
const windowPool = {};

const RemoteBaseWindow = function () {
}

/**
 * 创建一个窗体对象
 * @param winName
 * @param options
 */
RemoteBaseWindow.prototype.createWindow = function (winName, options) {

    // 判断窗体池中是否已经有这个窗体
    if (windowPool[winName])
        throw '=:|======> createWindow 创建失败, 窗体已经存在！';

    let defaults = {
        nodeIntegration: false
    };
    // 合并替换
    options = Object.assign(defaults, options);

    // 新建一个窗体
    let manageWindow = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: options.nodeIntegration // nodeIntegration: false 禁用子窗体使用 node.js功能
        }
    });
    // 当窗口已经关闭的时候触发
    manageWindow.on('closed', () => {
        manageWindow = null; // 删除对已经关闭的窗口的引用对象和避免再次使用它
        windowPool[winName] = null; // 删除窗体池里对应的对象
    });
    // 将窗体保存到窗体池
    windowPool[winName] = manageWindow;
    return windowPool[winName];
}

/**
 * 获取一个已经存在的窗体
 * @param winName
 */
RemoteBaseWindow.prototype.getWindow = function (winName) {
    let win = windowPool[winName];
    if (win)
        return win;
    else
        throw '=:|======> getWindow 获取的窗体不存在！';
}

/**
 * 打开新窗体
 */
RemoteBaseWindow.prototype.open = function (win, url) {
    win.loadURL(url);
    // win.minimize();
    // win.openDevTools();
    // win.maximize();
}

/**
 * 执行脚本
 * @param manageWindow
 * @param injectScript
 * @param callback
 */
RemoteBaseWindow.prototype.execJavaScript = function (win, injectScript, callback) {
    // 脚本不为空时才能执行
    if (!injectScript)
        throw 'execJavaScript =:|======> 执行脚本不能为空';
    // 在 webContents 中执行脚本
    win.webContents.executeJavaScript(RemoteBaseWindow.scriptBuilder(injectScript), false, (result) => {
        try {
            callback(result);
        } catch (err) {
            result.err = 'executeJavaScript =:|======> 执行失败!' + err;
            callback(result);
        }
    });
}

/**
 * 脚本生成
 * @param script
 * @param index
 */
RemoteBaseWindow.scriptBuilder = function (script) {
    let scriptShell = `
        var scriptBuilder = function () {
            return new Promise((resolve, reject) => {
                ${script}
            });
        };

        scriptBuilder().then((data) => {
            return {err: null, data: data};
        }).catch((err) => {
            return {err: 'scriptBuilder ==:|======>  ' + err, data: null}
        });
    `;

    // 使用正则.replace(/[\n]|\s{2,}/g, '')移除所有回车符 和 两个以上的空格
    return scriptShell.replace(/[\n]|\s{2,}/g, ' ');
}

module.exports = RemoteBaseWindow;