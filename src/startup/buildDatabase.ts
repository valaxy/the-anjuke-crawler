/**
 * 【入口文件】
 * 执行后构建数据库
 */
import { sequelize } from '../db'
import fs = require('fs-extra')
import path = require('path')
import { setting } from '../setting'

fs.mkdirSync(path.dirname(setting.databaseFilePath), {
    recursive: true
})
sequelize.sync()
