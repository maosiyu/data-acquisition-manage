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
const mUUID = new UUID();
// 实例
const BaseService = require('../service/BaseService');
const mBaseService = new BaseService();

/**
 * 打开窗体 同名窗体将被复用
 *
 * @param arg 格式要求 {"winName": "","url": "https://www.private-blog.com/", "injectScript": "document.querySelector('body').innerText;"}
 * @param callback
 * @returns {Promise<void>}
 */
const openWindow = async (arg) => {

    // 默认参数为测试使用, 在控制台中输入 openWindow().then((d) => console.log(d));
    arg = arg || {
        winName: "",
        url: "https://www.private-blog.com/",
        injectScript: "document.querySelector('body').innerText;"
    }

    try {
        return await mBaseService.openWindow(arg);
    } catch (e) {
        console.log(`openNewWindow =:|====> ${e}`);
        saveDataToLocal('controllerErrorLog.txt', `openNewWindow =:|====> ${e} \n\n`);
    }
}

/**
 * 插入数据
 * @param sql
 * @returns {Promise<void>}
 */
const insertData = async (sql) => {
    try {
        return await mBaseService.insertData(sql);
    } catch (e) {
        console.log(`insertData =:|====> ${e}`);
        saveDataToLocal('controllerErrorLog.txt', `insertData =:|====> ${e} \n\n`);
    }
}

/**
 * 查询数据 selectData('select * from bq_store').then((d) => console.log(d));
 * @param sql
 * @returns {Promise<void>}
 */
const selectData = async (sql) => {
    try {
        return await mBaseService.selectData(sql);
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
const saveDataToLocal = (fileName, data) => {
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
const timerOpen = (scheduleName, rule, callback) => {
    if (!rule)
        throw `=:|======> timerOpen rule 参数不能为 ${rule} ！`;

    let schedule = mSchedulePool[scheduleName];
    // 如果池中存在, 就返回这个定时器
    if (schedule)
        return schedule;
    // 如果池中没有, 就新建一个定时器
    schedule = SCHEDULE.scheduleJob(rule, () => {
        callback();
    });
    // 将定时器保存到池中
    mSchedulePool[scheduleName] = schedule;
}

/**
 * 关闭定时器
 * @param scheduleName
 */
const timerClose = (scheduleName) => {
    let schedule = mSchedulePool[scheduleName];
    // 如果池中有就关闭这个定时器
    if (schedule) {
        schedule.cancel();
        mSchedulePool[scheduleName] = null;
    }
    // 如果没有就什么都不做
}
