import { AjkCrawlTask } from "../entity/AjkCrawlTask"
import { Crawl } from "./Crawl"
import { TaskQueue } from "./TaskQueue"
import * as assert from 'assert'
import { AjkCommunity } from "../entity/AjkCommunity"
import { getLogger } from '../log'

export class CommunityViewCrawl implements Crawl {
    constructor(private _q: TaskQueue) { }

    recognize(task: AjkCrawlTask) {
        return task.type == 'communityView'
    }

    async process(task: AjkCrawlTask) {
        let $ = await this._q.tryCrawlHtml(task, { save: false })

        let community = new AjkCommunity()
        community.ajkId = this._getId(task.requestUrl)
        community.name = this._getName($)
        this._initFields(community, $)
        logger.info(community.toJSON())

        await task.save()
        // let averagePrice = $('.contain-mod .comm-basic-mod .average').text()
    }

    private _getId(url: string) {
        let match = url.match(/https:\/\/\w+\.anjuke\.com\/community\/view\/(\d+)/)
        assert(!!match)

        let id = match[1]
        assert(!!id)
        return id
    }


    private _getName($: CheerioStatic) {
        let name = $('.p_crumbs a:last-child').text().trim()
        assert(!!name)
        return name
    }


    private _initFields(community: AjkCommunity, $: CheerioStatic) {
        let $forms = $('.basic-parms-mod').children()
        assert($forms.length % 2 == 0, `$forms.legnth=${$forms.length} should be even`)

        for (let i = 0; i < $forms.length / 2; i++) {
            let dt: string = $($forms.get(i)).text().trim()
            let dd: string = $($forms.get(i + 1)).text().trim()
            if (dd == '暂无数据') { continue }

            switch (dt) {
                case '物业类型：':
                    community.houseType = dd
                    break
                case '总户数：':
                    let match = dd.match(/^(\d+)户$/)
                    assert(match)
                    community.households = Number(match[1])
                    break
            }
        }
    }
}

const logger = getLogger(CommunityViewCrawl.name)
