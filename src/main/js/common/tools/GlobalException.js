/**
 * Created by mao-siyu on 16-12-14.
 */
const fs = require('fs');
// 时间格式化
const moment = require('moment');
// 监听Node程序退出
process.on('exit', function (code) {
    console.info('程序在:===>' + moment(Date.now()).format('YYYY-MM-DD HH:mm:ss') + ' 时停止工作!');
});
// 监听Node程序中所有未处理的异常
process.on("uncaughtException", (err) => {
    err = 'ErrorMessage: ' + err + '\n' + 'ErrorDate   : ' + moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    console.error('============================================= BEGIN ==========================================================');
    console.error(err);
    // 以追加的方式 将文件写到硬盘的当前目录
    fs.appendFile('NodeErrorLog.txt', err + '\n\n', (err) => {
    });
    console.error('============================================== END ===========================================================\n');
});