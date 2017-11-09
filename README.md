# data-acquisition-manage
## electron 实现爬虫

.
├── main.js
├── package.json
├── package-lock.json
├── project.txt
├── README.md
└── src
    └── main
        └── js
            ├── common
            │   ├── core
            │   │   ├── MainWindow.js
            │   │   └── RemoteBaseWindow.js
            │   ├── database
            │   │   ├── Config.js
            │   │   ├── DataSourceProxy.js
            │   │   └── Mysql.js
            │   └── tools
            │       ├── FileIO.js
            │       ├── GlobalException.js
            │       └── UUID.js
            ├── controller
            │   ├── controller.html
            │   └── controller.js
            ├── dao
            │   └── BaseDao.js
            └── service
                └── BaseService.js

10 directories, 17 files

## 启动简单
> npm start
### 弹出窗体 应用自定义的API对数据进行抓取
