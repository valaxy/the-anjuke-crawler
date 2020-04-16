import async from 'async'
import request = require('request-promise')
import { AjkCrawlTask } from '../entity/AjkCrawlTask'
import { getLogger } from '../log'
import { Crawl } from './Crawl'
import { CommunityListHomeCrawl } from './CommunityListHomeCrawl'
import { setting } from '../setting'
import cheerio = require('cheerio')
import { CommunityListCrawl } from './CommunityListCrawl'
import { CommunityViewCrawl } from './CommunityViewCrawl'


export class TaskQueue {
    private _q: async.AsyncQueue<AjkCrawlTask>
    private _crawls: Crawl[]

    constructor() {
        this._q = async.queue<AjkCrawlTask>(async (task) => {
            try {
                let crawl = this._findCrawl(task)
                await crawl.process(task)
            } catch (err) {
                logger.error(err)
                process.exit(-1) // TODO
            }
        }, 1)

        this._crawls = [
            new CommunityListHomeCrawl(this),
            new CommunityListCrawl(this),
            new CommunityViewCrawl(this),
        ]
    }


    async push(task: AjkCrawlTask) {
        return new Promise((resolve, reject) => {
            this._q.push(task, (err) => {
                if (err) { return reject(err) }
                resolve()
            })
        })
    }

    async request(opts: { url: string }) {
        logger.info(`request url: ${opts.url}`)
        let res = await request({
            url: opts.url,
            method: 'get',
            headers: setting.crawlRequest.headers
        })
        await this._wait()
        return res
    }


    /**
     * 尝试生成一个任务到DB。如果任务已经存在的什么都不做，否则在数据库插入一条记录
     */
    async tryGenerateTask(props: {
        type: typeof AjkCrawlTask.prototype.type,
        requestUrl: string
    }, t) {
        let task = await AjkCrawlTask.findOne({
            where: props,
            transaction: t,
        })

        if (!task) {
            task = new AjkCrawlTask()
            task.status = 'created'
            task.type = props.type
            task.requestUrl = props.requestUrl
            await task.save({
                transaction: t,
            })
        }

        return task
    }


    async tryCrawlHtml(task: AjkCrawlTask): Promise<CheerioStatic> {
        if (task.status == 'created') {
            let res = await this.request({ url: task.requestUrl })
            let $ = cheerio.load(res)

            task.responseHtml = res
            task.status = 'crawled'
            task.updateTime = new Date
            await task.save()

            return $
        } else {
            return cheerio.load(task.responseHtml)
        }
    }


    private _findCrawl(task: AjkCrawlTask) {
        for (let crawl of this._crawls) {
            if (crawl.recognize(task)) {
                return crawl
            }
        }

        throw new Error(`can not find crawl with task.type=${task.type}`)
    }

    private _wait(ms = 1000) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, ms)
        })
    }
}

const logger = getLogger(TaskQueue.name)
