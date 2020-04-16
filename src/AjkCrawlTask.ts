import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, Unique, NotNull } from 'sequelize-typescript'

/**
 * 安居客抓取任务
 */
@Table({
    tableName: 'AjkCrawlTask',
    timestamps: false,
})
export class AjkCrawlTask extends Model {
    /**
     * 任务ID，唯一标识符，自增就行
     */
    @AutoIncrement
    @PrimaryKey
    @Column
    id: number


    /**
     * 任务的状态
     */
    @AllowNull(false)
    @Column
    status
        : 'created'     // 创建完毕未抓取
        | 'crawled'     // 抓取完毕未处理
        | 'parsed'      // 处理完毕


    @Unique({ name: 'unique_request', msg: '' })
    @AllowNull(false)
    @Column
    type
        : 'communityList'   // 处理小区列表的任务
        | 'communityView'   // 处理小区详情的任务

    /**
     * 请求URL
     */
    @Unique({ name: 'unique_request', msg: '' })
    @AllowNull(false)
    @Column
    request_url: string


    /**
     * 最近一次抓取的html
     */
    @AllowNull
    @Column
    response_html: string


    /**
     * 数据行创建时间
     */
    @AllowNull(false)
    @Column
    create_time: Date


    /**
     * 数据行更新时间
     */
    @AllowNull(false)
    @Column
    update_time: Date
}


// /**
//  * 最近一次成功的抓取时间，每次抓取成功后都要更新这个字段
//  */
// @AllowNull
// @Column
// crawl_time: Date


// /**
//  * 最近一次成功的解析时间，每次解析成功后都要更新这个字段
//  */
// @AllowNull
// @Column
// parse_time: Date
