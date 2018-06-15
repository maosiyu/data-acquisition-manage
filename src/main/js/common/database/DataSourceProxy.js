/**
 * Created by mao-siyu on 17-6-23.
 */
const Mysql = require('./Mysql');
const mMysql = new Mysql();
const FileIO = require('../tools/FileIO');
const mFileIO = new FileIO();
const path = require('path');

/**
 * 数据处理代理类
 *
 * @author mao-siyu
 * @data 2018-05-17
 */
class DBProxy {

    constructor() {
    }

    /**
     * 应用 mysql 数据库
     * @param sql
     * @param callback(err, resultSet, fields)
     */
    mySqlExec(sql, callback) {
        mMysql.query(sql, callback);
    }

    /**
     * 向本地写数据
     * @param options
     */
    async files(options) {
        let option = {
            fileName: '',
            resultData: ''
        }
        option = Object.assign(option, options);

        let newFilePath = path.join(__dirname, '../../../../../../' + option.fileName);
        // 保存到本地硬盘
        try {
            await mFileIO.mkdirsPromise(newFilePath);
            await mFileIO.localWriteFilePromise(newFilePath, option.resultData);
            console.info(`本地数据保存成功!    ${newFilePath}`);
        } catch (e) {
            console.error(`本地数据保存失败!    ${e}`);
        }
    }

}

module.exports = DBProxy;