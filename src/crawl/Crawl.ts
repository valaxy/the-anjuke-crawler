import { AjkCrawlTask } from "../entity/AjkCrawlTask"

export interface Crawl {
    recognize(task: AjkCrawlTask): boolean
    process(task: AjkCrawlTask): any
}
