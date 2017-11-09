/**
 * Created by mao-siyu on 17-6-29.
 */
const RemoteBaseWindow = require('../common/core/RemoteBaseWindow');
const mRemoteBaseWindow = new RemoteBaseWindow();

const BaseDao = require('../dao/BaseDao');
const mBaseDao = new BaseDao();

/**
 * 基础服务类
 * @param webview
 * @param stepCache
 * @param repeatNum
 * @constructor
 */
const BaseService = function () {
}

/**
 * 打开窗体
 * @param arg
 * @param callback
 */
BaseService.prototype.openNewWindow = function (arg, callback) {
    // 打开窗体
    let win;
    try {
        win = mRemoteBaseWindow.getWindow(arg.winName);
    } catch (e) {
        win = mRemoteBaseWindow.createWindow(arg.winName);
    }
    // 打开新窗体
    mRemoteBaseWindow.open(win, arg.url);
    // 执行脚本
    mRemoteBaseWindow.execJavaScript(win, arg.injectScript, (result) => {
        if (!callback)
            return;
        callback(result, win);
    });
}

/**
 * 应用已存在的窗体
 * @param arg
 * @param callback
 */
BaseService.prototype.operationExistsWindow = function (arg, callback) {
    let win = mRemoteBaseWindow.getWindow(arg.winName);
    // 如果 url 存在就替换之前的 URL, 否则只复用窗体
    if (arg.url)
        mRemoteBaseWindow.open(win, arg.url);
    // 执行脚本
    mRemoteBaseWindow.execJavaScript(win, arg.injectScript, (result) => {
        if (!callback)
            return;
        callback(result, win);
    });
}

/**
 * 插入数据
 * @param sql
 * @param callback
 */
BaseService.prototype.insertData = function (sql, callback) {
    mBaseDao.insertData(sql, callback);
}

/**
 * 查询数据
 * @param sql
 * @param callback
 */
BaseService.prototype.selectData = function (sql, callback) {
    mBaseDao.selectData(sql, callback);
}

/**
 * 数据保存到本地
 * @param param
 * @param url
 */
BaseService.prototype.saveDataToLocal = function (fileName, data) {
    mBaseDao.saveDataToLocal(fileName, data);
}

module.exports = BaseService;
