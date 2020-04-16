import { Sequelize } from 'sequelize-typescript'
import { AjkCrawlTask } from './AjkCrawlTask'
import { setting } from './setting'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    host: 'localhost',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    storage: setting.databaseFilePath,
})

sequelize.addModels([
    AjkCrawlTask
])

export { sequelize }
