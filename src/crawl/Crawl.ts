import { AjkCrawlTask } from "../AjkCrawlTask"

export interface Crawl {
    recognize(task: AjkCrawlTask): boolean
    process(task: AjkCrawlTask): any
}
