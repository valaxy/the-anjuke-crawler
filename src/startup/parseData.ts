/**
 * 入口文件
 */
import { AjkCrawlTask } from '../entity/AjkCrawlTask'
import { sequelize } from '../db'
import { TaskQueue } from '../crawl/TaskQueue'
import * as _ from 'lodash'
import { wait } from '../utils/utils'

const main = async function () {
    let q = new TaskQueue()

    while (true) {
        let tasks = await AjkCrawlTask.findAll({
            where: {
                status: ['crawled'],
                type: 'communityView'
            },
            limit: 10
        })

        tasks = _.shuffle(tasks) // 打乱顺序执行隐藏爬虫意图。。

        if (tasks.length == 0) { break }

        for (let task of tasks) {
            await q.push(task)
        }

        // console.log('wait another cycle')
        // await wait(10000)
    }

    // await sequelize.close()
    // console.log('close')
}


main().catch(err => console.error(err))


