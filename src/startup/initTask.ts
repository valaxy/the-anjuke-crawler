/**
 * 【入口文件】
 * 初始化任务
 */
import { sequelize } from '../db'
import { AjkCrawlTask } from '../entity/AjkCrawlTask'

const main = async function () {
    let task = new AjkCrawlTask()
    task.status = 'created'
    task.type = 'communityListHome'
    task.requestUrl = 'https://cs.anjuke.com/community/o5/o5/'
    await task.save()
    sequelize.close()
}

main().catch(err => console.error(err))
