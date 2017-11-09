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
