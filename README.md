# data-acquisition-manage
### electron 实现爬虫

![image](https://github.com/maosiyu/data-acquisition-manage/blob/master/snapshot.jpg)

### 初始化 启用
``` ruby
$> npm i
$> npm start
```

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
