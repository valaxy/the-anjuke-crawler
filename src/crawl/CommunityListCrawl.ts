import { AjkCrawlTask } from "../entity/AjkCrawlTask"
import { Crawl } from "./Crawl"
import { TaskQueue } from "./TaskQueue"
import { sequelize } from "../db"
import cheerio = require('cheerio')

export class CommunityListCrawl implements Crawl {
    constructor(private _q: TaskQueue) { }

    recognize(task: AjkCrawlTask) {
        return task.type == 'communityList'
    }

    async process(task: AjkCrawlTask) {
        let $ = await this._q.tryCrawlHtml(task)

        if (task.status == 'crawled') {
            let hrefs: string[] = $('.list-content .li-itemmod > a').map(function () {
                let href = $(this).attr('href').trim()
                return href
            }).toArray() as any

            if (hrefs.length != 0) {

                let match = task.requestUrl.match(/\/o5(-p(\d+))?\//)
                let n = match[1] && match[2]
                    ? Number(match[2]) + 1
                    : 2

                let newUrl = task.requestUrl.replace(/\/o5(-p\d+)?\//, () => {
                    return `/o5-p${n}/`
                })

                // 下一页任务
                await this._q.tryGenerateTask({
                    type: 'communityList',
                    requestUrl: newUrl,
                }, null)


                // 生成详情任务
                for (let href of hrefs) {
                    await this._q.tryGenerateTask({
                        type: 'communityView',
                        requestUrl: href,
                    }, null)
                }
            }

            task.status = 'parsed'
            task.updateTime = new Date
            await task.save()
        }
    }
}
