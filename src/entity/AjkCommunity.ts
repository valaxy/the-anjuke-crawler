import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, Default } from 'sequelize-typescript'
import Sequelize from 'sequelize'

@Table({
    tableName: 'ajkCommunity',
    timestamps: false,
})
export class AjkCommunity extends Model<AjkCommunity> {
    /**
     * 安居客ID
     */
    @PrimaryKey
    @Column
    ajkId: string


    /**
     * 名称
     */
    @AllowNull(false)
    @Column
    name: string

    /**
     * 均价，元每平米
     */
    @AllowNull
    @Column
    averagePrice: number

    /**
     * 房屋类型
     */
    @AllowNull
    @Column
    houseType: string


    /**
     * 总户数
     */
    @AllowNull
    @Column
    households: number


    /**
     * 建造年代
     */
    @AllowNull
    @Column
    buildYear: number


    /**
     * 位置
     */
    @AllowNull
    @Column
    location: string


    /**
     * 数据行创建时间
     */
    @AllowNull(false)
    @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
    @Column
    createTime: Date


    /**
     * 数据行更新时间
     */
    @AllowNull(false)
    @Default(Sequelize.literal('CURRENT_TIMESTAMP')) // 好吧，sqlite3不支持ON UPDATE CURRENT_TIMESTAMP
    @Column
    updateTime: Date
}



// /**
//  * 物业公司
//  */
// @Column
// propertyCompany: string


