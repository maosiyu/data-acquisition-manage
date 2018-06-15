/**
 * Created by mao-siyu on 17-6-29.
 */
// 数据源代理
const DataSourceProxy = require('../common/database/DataSourceProxy');
const mDataSourceProxy = new DataSourceProxy();

/**
 * 数据处理层
 * @author mao-siyu
 * @data 2018-05-17
 */
class BaseDao {

    constructor() {
    }

    /**
     * 插入数据
     * @param sql
     * @param callback(err, resultSet, fields)
     */
    insertData(sql, callback) {
        mDataSourceProxy.mySqlExec(sql, callback);
    }

    /**
     * 查询数据
     * @param sql
     * @param callback(err, resultSet, fields)
     */
    selectData(sql, callback) {
        mDataSourceProxy.mySqlExec(sql, callback);
    }

    /** ===================================== 以下是操作本地数据方法区域 ======================================== */

    /**
     * 数据保存到本地
     * @param param
     * @param hostname
     */
    saveDataToLocal(fileName, data) {
        mDataSourceProxy.files({
            fileName: fileName,
            resultData: data,
        });
    }
}

module.exports = BaseDao;