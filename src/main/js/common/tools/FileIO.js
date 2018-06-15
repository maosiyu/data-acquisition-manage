const path = require('path');
const fs = require('fs');

/**
 * 共通下载工具类
 * @param object 实现类的 类对象
 */
class FileIO {

    constructor() {
    }

    /**
     * 向本地写文件
     * @param fileName 要生成的文件名
     * @param fileContent 要生成的文件内容
     */
    localWriteFile(filePath, fileContent, callback) {
        fs.appendFile(filePath, fileContent, (err) => {
            if (err)
                throw 'Tools.localWriteFile =:|=====> ' + err;
            if (callback)
                callback(true);
        });
    };

    /**
     * 定义Promise 向本地写文件
     */
    localWriteFilePromise(newFilePath, resultHtml) {
        return new Promise((resolve, reject) => {
            this.localWriteFile(newFilePath, resultHtml, () => {
                resolve();
            });
        });
    }

    /**
     * 从读取本地文件
     * @param filePath
     * @param charsetStr 默认UTF-8
     * @param callback 读取后回调数据
     */
    localReadFile(filePath, charsetStr, callback) {
        charsetStr = charsetStr || 'UTF-8';
        fs.readFile(filePath, charsetStr, (err, file) => {
            callback(err, file, path.basename(filePath));
        });
    }

    /**
     * 创建多层文件夹 异步递归
     * @param dirpath
     * @param mode
     * @param callback
     */
    mkdirs(filePath, mode, callback) {
        fs.exists(filePath, (exists) => {
            if (exists && callback) {
                callback();
            } else {
                // 尝试创建父目录，然后再创建当前目录
                this.mkdirs(path.dirname(filePath), mode, () => {
                    // 接收参数：
                    // path          将创建的目录路径
                    // mode          目录权限（读写权限），默认0777
                    // validate      回调，传递异常参数err
                    fs.mkdir(filePath, mode, callback);
                });
            }
        });
    };

    /**
     * Promise 创建多层文件夹 异步递归
     */
    mkdirsPromise(newFilePath) {
        return new Promise((resolve, reject) => {
            this.mkdirs(path.dirname(newFilePath), null, () => {
                resolve();
            });
        });
    }

    /**
     * 删除文件
     * @param filePath 文件
     * @param callback 回调函数
     */
    localDeleteFile(filePath, callback) {
        fs.unlink(path.join(__dirname, filePath), (err) => {
            if (err)
                throw 'Tools.localDeleteFile =:|=====> ' + err;
            if (callback)
                callback(true);
        });

    }

    /**
     * 读取目录下所有的文件
     * @param dirPath
     * @param callback
     */
    readdirs(dirPath, callback) {
        fs.readdir(path.join(__dirname, dirPath), (err, files) => {
            if (err)
                throw 'Tools.readdirs =:|=====> ' + err;
            callback(files);
        });
    }

}

module.exports = FileIO;