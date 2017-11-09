# data-acquisition-manage
## electron 实现爬虫
```
.
├── main.js
├── package.json
├── package-lock.json
├── project-tree.txt
├── project.txt
├── README.md
├── src
│   └── main
│       └── js
│           ├── common
│           │   ├── core
│           │   │   ├── MainWindow.js
│           │   │   └── RemoteBaseWindow.js
│           │   ├── database
│           │   │   ├── Config.js
│           │   │   ├── DataSourceProxy.js
│           │   │   └── Mysql.js
│           │   └── tools
│           │       ├── FileIO.js
│           │       ├── GlobalException.js
│           │       └── UUID.js
│           ├── controller
│           │   ├── controller.html
│           │   └── controller.js
│           ├── dao
│           │   └── BaseDao.js
│           └── service
│               └── BaseService.js
└── testScript.js

10 directories, 19 files

```
## 启动简单
> npm start

弹出窗体 应用自定义的API对数据进行抓取

支持将数据保存到本地 与 保存到数据库两种方式

支持 electron-packager | asar pack 打包

支持 定时采集

项目中提供测试脚本 testScript.js, 程序启动后, 直接粘贴在窗口中运行即可.

***

## 测试脚本
``` js
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
```

***

## 采集结果
``` json
timerOpen    =:|====>    2017-11-09 10:48:42
{
    "data": [
        "2017，我们来聊聊 Node.js",
        "测试请发到客户端测试专区，违规影响用户的，直接封号",
        "【PPT】「Ops First」 - Node 地下铁第五期线下沙龙分享和PPT",
        "饿了么大前端 Node.js 进阶教程",
        "请别拿“死”人做文章",
        "基于bsdiff（v4.3）的node扩展模块",
        "[新手]在学习typescript时，在用到promise时候，遇到如下问题编译不通过，应该如何处理",
        "Node 8 LTS 有 async 了很兴奋？ 来，说说这 2 段代码的区别。",
        "node 项目 api自动生成工具大家都用哪些？",
        "Node.js能否通过异步解决10s的while？",
        "Promise 必知必会（十道题）",
        "谁有时间写一个SSH keys manager，命令行工具，练手还是非常好的",
        "关于node的架构问题",
        "excel导入大量数据导致web页面阻塞 有没有什么好的解决方案。",
        "Promise 的链式调用与中止",
        "想问下，用户上传文件，存到云端，是上传到服务端后，然后传到阿里云上，最后再删掉服务端上的文件吗",
        "免费可以测试的vps服务器资源？",
        "Lock到底好不好？",
        "新手，刚第一个node项目",
        "node-schedule定时任务偶尔会提前一分钟，是我哪里写错了吗",
        "JS基础题，却有多少人能弄清楚其中的奥义？",
        "关于es6的promise中reject 与 await问题。有些不懂",
        "egg.js 和 think.js 对比，各有什么优劣？",
        "iView 发布后台管理系统 iview-admin，没错，它就是你想要的",
        "不间断的提示502 Bad Gateway是什么意思呢？",
        "mongodb聚合查询",
        "egg项目怎么调试，有无一些好点调试方法呢？",
        "node源码粗读(1)：一个简单的nodejs文件从运行到结束都发生了什么",
        "新手，刚部署好了第一个node项目，开心。",
        "有没有好的类似大众点评附近商家地理位置的算法",
        "找不到工作的我，只好研究自动投递简历了",
        "Mint UI 修改样式问题？",
        "请问有没有基于的Node的，可以检测微信收款情况的库或解决方案？",
        "NodeQuant：一个基于Node.js的开源量化交易平台",
        "这样的validator.js是不是你想要的呢？",
        "爬虫大家都会写，但用这个爬虫框架只要十行代码",
        "基于阿里的Node全栈之路[实践篇]（之前忘记放github地址了Orz）",
        "如何发挥NodeJS单线程异步非阻塞I/O性能优势？#Hbase #Thrift2",
        "2.Node.js access_token的获取、存储及更新",
        "Vue-router 的history模式导致无法加载JS"
    ],
    "err": null
}
openNewWindow    =:|====>    本次采集完成!2017-11-09 10:48:43
/home/mao-siyu/文档/code/node-js/WebDownload/git-project/data-acquisition-manage/src/main/js/common/d…:31 本地数据保存成功!    /home/mao-siyu/文档/code/node-js/WebDownload/git-project/fileName
```
