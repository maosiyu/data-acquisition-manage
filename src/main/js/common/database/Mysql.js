/* =-=-=-=-=-=-=-=-=-= 此文件是链接 mysql 的配置文件 =-=-=-=-=-=-=-=-=-=-= */
const EventEmitter = require('events').EventEmitter;
const mysql = require('mysql');
const Config = require('./Config');

/**
 * 创建mysql连接池
 * @type {Pool}
 */
const pool = mysql.createPool({
    connectionLimit: 100000,
    connectTimeout: 60 * 60 * 100000,
    aquireTimeout: 60 * 60 * 100000,
    timeout: 60 * 60 * 100000,
    host: Config.host,
    port: Config.port,
    user: Config.user,
    database: Config.database,
    password: Config.password
});

const connection = function () {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err)
                reject(err);
            resolve(connection);
        });
    });
}

const query = function (sql, connection) {
    return new Promise(function (resolve, reject) {
        connection.query(sql, function (err, rows) {
            if (err)
                reject(err);
            // 还是得释放链接
            connection.release();
            resolve(rows);
        });
    });
}

const DB = function () {
}

DB.query = function (sql, callback) {
    connection().then(function (connection) {
        return query(sql, connection);
    }).then(function (rows) {
        callback(rows);
    }).catch(function (err) {
        console.error('mysql =:|======> ' + err);
    });
}

module.exports = DB;