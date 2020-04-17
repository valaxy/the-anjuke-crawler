import { AjkCrawlTask } from "../entity/AjkCrawlTask"
import { Crawl } from "./Crawl"
import cheerio = require('cheerio')
import { TaskQueue } from "./TaskQueue"
import { sequelize } from "../db"

export class CommunityListHomeCrawl implements Crawl {
    constructor(private _q: TaskQueue) { }

    recognize(task: AjkCrawlTask) {
        return task.type == 'communityListHome'
    }

    async process(task: AjkCrawlTask) {
        let $: CheerioStatic
        if (task.status == 'created') {
            let res = await this._q.request({ url: task.requestUrl })
            $ = cheerio.load(res)

            task.responseHtml = res.body
            task.status = 'crawled'
            task.updateTime = new Date
            await task.save()
        } else {
            $ = cheerio.load(task.responseHtml)
        }

        if (task.status == 'crawled') {
            let hrefs: string[] = $('a').map(function () {
                let href = $(this).attr('href')
                return href
            }).toArray() as any

            hrefs = hrefs.filter((href) => {
                let match = href.match(/https:\/\/\w+\.anjuke\.com\/community\/([\w]+)\/o5\//)
                return match && match[1] != 'o5'
            })

            await sequelize.transaction(async (t) => {
                for (let href of hrefs) {
                    await this._q.tryGenerateTask({
                        type: 'communityList',
                        requestUrl: href
                    }, t)
                }

                task.status = 'parsed'
                task.updateTime = new Date()
                await task.save({ transaction: t })
            })
        }
    }
}
