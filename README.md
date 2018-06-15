# data-acquisition-manage
### electron 实现爬虫

[![](快照)](https://github.com/maosiyu/data-acquisition-manage)

### 初始化 启用
$> npm i
$> npm start

项目代码全部采用ES7语法编写

加入代码高亮插件

支持 将数据保存到本地

支持 将保存到MySql数据库

支持 electron-packager | asar pack 打包

支持 定时采集

***

### 测试脚本
``` js
let script = `
    let temps = document.querySelectorAll('#topic_list > div > div > a');
    let titles = [];
    temps.forEach((v) => {
        titles.push(v.innerText);
    });
		titles;
`;
openWindow({"winName": "","url": "https://cnodejs.org/", "injectScript": script}).then((d) => {
    // 将文件保存到本地
    saveDataToLocal('测试.txt', d);
    // 控制台输出
    console.log(JSON.stringify(d, null, 4))
});
```

***

### 采集结果
``` json
[
    "举办一个node聚会在广州",
    "【头条】第六届 杭州 Node Party 杭电专场开始报名啦",
    "【NODE PARTY】【上海】【已结束】PPT已上传",
    "为社区做贡献，帮社区写自动化测试代码",
    "开发环境从 windows 到 Linux 攻略",
    "遍历对比不同版本的压缩包内的文件，挑出不同的文件，该如何实现？",
    "npm install 的幽灵事件，求解答，如图。",
    "现在还有人在用grunt构建项目么？",
    "cnode社区小程序版本（已经上线，小程序：cnode微助手），界面参考自cnode社区安卓版",
    "《Node.js实战：使用Egg.js + Vue.js + Docker构建渐进式、可持续集成与交付应用》 新书预热。",
    "百度Echarts图表在Vue项目的完整引入以及按需加载",
    "《Node.js：来一打 C++ 扩展》已出版，求支持",
    "Deno 并不是下一代 Node.js",
    "请问 ！阿里云OSS 服务端签名直传并设置上传回调 有谁做过吗？",
    "请问nodejs中用户的token是怎么生成的呢？",
    "Egg+Vue+EasyWebpack中后端解决方案",
    "React入门真难",
    "koa2，异步mysql查询，返回数据渲染页面",
    "Vue 工程路线图",
    "前后端分离安全问题？",
    "前端回炉计划：整理并推荐一些实用的网站",
    "Nodejs 如何文件追加从最开始开始追加",
    "自己搭了一个简单的web的架子，希望能给点建议",
    "后端api 如何实现手机app restapi接口 多版本兼容?",
    "【全文】狼叔：如何正确的学习Node.js",
    "移动端入门Node.js怎么学习?",
    "实现小程序版 CNode 社区",
    "前端进阶全栈开发, typescript 了解下",
    "性能优化知识与实践整理",
    "[星云链] 3200 万奖金的 DApp 开发激励计划（提交即可获得7000元）",
    "【Free】免费的 Egret 、白鹭游戏引擎视频教程、连载系列第一期",
    "moapi(mock工具) 快速生成mock server&doc",
    "node新手做的一个前端后台分离项目。前端：vue + element-ui 后台：koa2 + sequelize + mysql2",
    "关于koa-router和koa-multer结合使用(require,module.exports)，实现图片上传和表单数据提交的请教",
    "Node练手 前后端分离项目 前端：vue 后台：koa2 + MongoDB + Elasticsearch 等实现磁力链接资源搜索",
    "ubuntu中 使用nvm安装的node 后 npm install 就无法使用了",
    "开源一款基于electron的自用程序员工具箱应用",
    "不到五分钟，搭建服务器，不写一行代码，跑起应用逻辑和API",
    "免费的 Nodejs 视频教程",
    "对fetch timeout的思考"
]
```
