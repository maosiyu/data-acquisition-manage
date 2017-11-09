/**
 * Created by mao-siyu on 17-6-23.
 */
const Mysql = require('./Mysql');
const FileIO = require('../tools/FileIO');
const path = require('path');

const DBProxy = function () {
}

// 应用 mysql 数据库
DBProxy.prototype.mySqlExec = function (sql, callback) {
    Mysql.query(sql, callback);
}

// 向本地写数据
DBProxy.prototype.files = function (options) {
    let option = {
        fileName: '',
        resultData: ''
    }
    options = Object.assign(option, options);

    let newFilePath = path.join(__dirname, '../../../../../../' + option.fileName);
    // 保存到本地硬盘
    FileIO.mkdirsPromise(newFilePath).then(() => {
        return FileIO.localWriteFilePromise(newFilePath, option.resultData).catch((err) => {
            console.error(err);
        });
    }).then(() => {
        console.info('本地数据保存成功!    ' + newFilePath);
    }).catch((err) => {
        console.error('本地数据保存失败!' + err);
    });
}

module.exports = DBProxy;