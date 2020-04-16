/**
 * 入口文件
 */
import { AjkCrawlTask } from '../AjkCrawlTask'
import { sequelize } from '../db'
import { TaskQueue } from '../crawl/TaskQueue'


const main = async function () {
    let tasks = await AjkCrawlTask.findAll({
        where: {
            status: ['created', 'crawled']
        }
    })

    let q = new TaskQueue()

    for (let task of tasks) {
        await q.push(task)
    }

    await sequelize.close()
}


main().catch(err => console.error(err))


