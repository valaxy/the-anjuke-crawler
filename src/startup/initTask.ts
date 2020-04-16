/**
 * 【入口文件】
 * 初始化任务
 */
import { sequelize } from '../db'
import { AjkCrawlTask } from '../AjkCrawlTask'

const main = async function () {
    let task = new AjkCrawlTask()
    task.status = 'created'
    task.type = 'communityList'
    task.request_url = 'https://cs.anjuke.com/community/'
    await task.save()
    sequelize.close()
}

main().catch(err => console.error(err))
