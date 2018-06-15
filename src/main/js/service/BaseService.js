/**
 * Created by mao-siyu on 17-6-29.
 */
const RemoteBaseWindow = require('../common/core/RemoteBaseWindow');
const mRemoteBaseWindow = new RemoteBaseWindow();

const BaseDao = require('../dao/BaseDao');
const mBaseDao = new BaseDao();

/**
 * 基础服务类
 *
 * @param webview
 * @param stepCache
 * @param repeatNum
 * @constructor
 */
class BaseService {

    constructor() {
    }

    /**
     * 打开窗体
     * @param arg
     * @param callback
     */
    async openWindow(arg) {
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
        return await mRemoteBaseWindow.execJavaScript(win, arg.injectScript);
    }

    /**
     * 插入数据
     * @param sql
     */
    insertData(sql) {
        return new Promise((resolve, reject) => {
            mBaseDao.insertData(sql, (err, resultSet) => {
                if (err)
                    reject(err)
                resolve(resultSet);
            });
        });
    }

    /**
     * 查询数据
     * @param sql
     */
    selectData(sql) {
        return new Promise((resolve, reject) => {
            mBaseDao.selectData(sql, (err, resultSet) => {
                if (err)
                    reject(err)
                resolve(resultSet);
            });
        });
    }

    /**
     * 数据保存到本地
     * @param param
     * @param url
     */
    saveDataToLocal(fileName, data) {
        mBaseDao.saveDataToLocal(fileName, data);
    }
}

module.exports = BaseService;