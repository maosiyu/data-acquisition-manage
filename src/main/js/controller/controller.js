/**
 * Created by mao_siyu on 2017/7/2.
 */
// 工具
const fs = require('fs');
const URL = require('url');
const AXIOS = require('axios');
const MOMENT = require('moment');
const SCHEDULE = require('node-schedule');
const UUID = require('../common/tools/UUID');
// 实例
const BaseService = require('../service/BaseService');
const mBaseService = new BaseService();
/**
 * 打开新窗体
 *
 * @param arg 格式要求 {"winName": "","url": "https://www.private-blog.com/", "injectScript": "resolve(document.querySelector(''));"}
 * @param callback 返回(result, win)
 */
const openNewWindow = function (arg, callback) {
    try {
        mBaseService.openNewWindow(arg, callback);
    } catch (e) {
        console.log(`openNewWindow =:|====> ${e}`);
        saveDataToLocal('controllerErrorLog.txt', `openNewWindow =:|====> ${e} \n\n`);
    }
}

/**
 * 操作一个已存在的窗体
 *
 * @param arg 格式要求 {"winName": "","url": "https://www.private-blog.com/", "injectScript": "resolve(document.querySelector(''));"}
 * @param callback 返回(result, win)
 */
const operationExistsWindow = function (arg, callback) {
    try {
        mBaseService.operationExistsWindow(arg, callback);
    } catch (e) {
        console.log(`operationExistsWindow =:|====> ${e}`);
        saveDataToLocal('controllerErrorLog.txt', `operationExistsWindow =:|====> ${e} \n\n`);
    }
}

/**
 * 插入数据
 * @param sql
 * @param callback
 */
const insertData = function (sql, callback) {
    try {
        mBaseService.insertData(sql, callback);
    } catch (e) {
        console.log(`insertData =:|====> ${e}`);
        saveDataToLocal('controllerErrorLog.txt', `insertData =:|====> ${e} \n\n`);
    }
}

/**
 * 查询数据
 * @param sql
 * @param callback
 */
const selectData = function (sql, callback) {
    try {
        mBaseService.selectData(sql, callback);
    } catch (e) {
        console.log(`selectData =:|====> ${e}`);
        saveDataToLocal('controllerErrorLog.txt', `selectData =:|====> ${e} \n\n`);
    }
}

/**
 * 数据保存到本地
 * @param fileName
 * @param data
 */
const saveDataToLocal = function (fileName, data) {
    try {
        mBaseService.saveDataToLocal(fileName, data);
    } catch (e) {
        console.log(`saveDataToLocal =:|====> ${e}`);
    }
}

// 定时器池
const mSchedulePool = {};
/**
 * 开启一个新的定时器
 * @param scheduleName
 * @param rule    var rule = new SCHEDULE.RecurrenceRule();
 * @param callback
 */
const timerOpen = function (scheduleName, rule, callback) {
    if (!rule)
        throw `=:|======> timerOpen rule 参数不能为 ${rule} ！`;

    let schedule = mSchedulePool[scheduleName];
    // 如果池中存在, 就返回这个定时器
    if (schedule)
        return schedule;
    // 如果池中没有, 就新建一个定时器
    schedule = SCHEDULE.scheduleJob(rule, function () {
        callback();
    });
    // 将定时器保存到池中
    mSchedulePool[scheduleName] = schedule;
}

/**
 * 关闭定时器
 * @param scheduleName
 */
const timerClose = function (scheduleName) {
    let schedule = mSchedulePool[scheduleName];
    // 如果池中有就关闭这个定时器
    if (schedule) {
        schedule.cancel();
        mSchedulePool[scheduleName] = null;
    }
    // 如果没有就什么都不做
}
