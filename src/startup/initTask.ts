/**
 * 【入口文件】
 * 初始化任务
 */
import { sequelize } from '../db'
import { AjkCrawlTask } from '../entity/AjkCrawlTask'

const urls = [
    // 'https://cs.anjuke.com/community/o5/o5/',
    'https://xa.anjuke.com/community/o5/o5/',
]

const main = async function () {
    for (let url of urls) {
        let task = new AjkCrawlTask()
        task.status = 'created'
        task.type = 'communityListHome'
        task.requestUrl = url
        await task.save()
        sequelize.close()
    }

}

main().catch(err => console.error(err))
