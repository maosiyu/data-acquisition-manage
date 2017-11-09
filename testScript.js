// 使用`反引号`编写js脚本, 抓取cNode社会首页的列表内容
let script_1 = `
    var temps = document.querySelectorAll('#topic_list > div > div > a');
    var titles = [];
    temps.forEach((v) => {
        titles.push(v.innerText);
    });
    resolve(titles);
`;

/**
 * 获取列表
 */
var getList = function () {

    openNewWindow({"winName": "cNodeHome", "url": "https://cnodejs.org/", "injectScript": script_1}, (result, win) => {
        if (result.err) {
            console.log("openNewWindow    =:|====>    " + result.err);
            return;
        }

        // 将数据输出到控制台
        console.log(JSON.stringify(result, null, 4));

        // 将数据保存到本地
        saveDataToLocal('fileName', JSON.stringify(result, null, 4));

        console.log("openNewWindow    =:|====>    本次采集完成!" + MOMENT(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
        win.destroy();
        return;
    });
}

// 开始执行
console.log("timerOpen    =:|====>    " + MOMENT(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
getList();


// 以下是应用定时抓取
// var rule = new SCHEDULE.RecurrenceRule();
// // rule.dayOfWeek = 2;   // 周几 (0 - 7) (0 or 7 is Sun)
// // rule.month = 3;       // 月   (1 - 12)
// // rule.dayOfMonth = 1;  // 日   (1 - 31)
// rule.hour = 21;        // 时   (0 - 23)
// rule.minute = 0;     // 分   (0 - 59)
// rule.second = 0;      // 秒   (0 - 59, OPTIONAL)
// timerClose("timer1");
// timerOpen("timer1", rule, () => {
//     console.log("timerOpen    =:|====>    " + MOMENT(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
//     getList();
// });
