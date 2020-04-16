/**
 * 入口文件
 */
import { AjkCrawlTask } from '../entity/AjkCrawlTask'
import { sequelize } from '../db'
import { TaskQueue } from '../crawl/TaskQueue'
import * as _ from 'lodash'

const main = async function () {
    let tasks = await AjkCrawlTask.findAll({
        where: {
            status: ['created', 'crawled']
        }
    })

    let q = new TaskQueue()

    tasks = _.shuffle(tasks) // 打乱顺序执行隐藏爬虫意图。。

    for (let task of tasks) {
        await q.push(task)
    }

    await sequelize.close()
    console.log('close')
}


main().catch(err => console.error(err))


