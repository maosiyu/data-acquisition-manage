/**
 * Created by mao-siyu on 17-6-29.
 */
// 数据源代理
const DataSourceProxy = require('../common/database/DataSourceProxy');
const mDataSourceProxy = new DataSourceProxy();

const BaseDao = function () {
}

/**
 * 插入数据
 * @param sql
 * @param callback
 */
BaseDao.prototype.insertData = function (sql, callback) {
    mDataSourceProxy.mySqlExec(sql, callback);
}

/**
 * 查询数据
 * @param sql
 * @param callback
 */
BaseDao.prototype.selectData = function (sql, callback) {
    mDataSourceProxy.mySqlExec(sql, callback);
}

/** ===================================== 以下是操作本地数据方法区域 ======================================== */

/**
 * 数据保存到本地
 * @param param
 * @param hostname
 */
BaseDao.prototype.saveDataToLocal = function (fileName, data) {
    mDataSourceProxy.files({
        fileName: fileName,
        resultData: data,
    });
}

module.exports = BaseDao;