/* =-=-=-=-=-=-=-=-=-= 此文件是链接 mysql 的配置文件 =-=-=-=-=-=-=-=-=-=-= */
const Config = require('./Config');
const mysql = require('mysql');

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
    database: Config.database,
    user: Config.user,
    password: Config.password
});

class DB {

    /**
     * 连接数据库
     *
     * @param sql
     * @param callback(err, resultSet, fields)
     */
    query(sql, callback) {
        pool.getConnection((err, conn) => {
            if (err) {
                callback(err, null, null);
            } else {
                /**
                 * err: 异常信息
                 * resultSet: 结果集
                 * fields: 每一列的详细信息
                 */
                conn.query(sql, (err, resultSet, fields) => {
                    // 释放连接
                    conn.release();
                    // 事件驱动回调
                    callback(err, resultSet, fields);
                });
            }
        });
    }
}

module.exports = DB;