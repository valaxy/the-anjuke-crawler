import path = require('path')

export const setting = {
    databaseFilePath: path.join(__dirname, '../runtime/database.sqlite'),
    crawlRequest: {
        headers: {
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7,ja;q=0.6',
            'cache-control': 'max-age=0',
            'cookie': 'wmda_uuid=ed0f71bd0dbe2afef11ea50e7ae97654; wmda_new_uuid=1; wmda_visited_projects=%3B6289197098934; search_words=%E6%96%B0%E9%95%BF%E6%B5%B7%E5%B9%BF%E5%9C%BA%7C%E7%90%86%E6%83%B3%E5%AE%B6%E5%9B%AD%7C%E5%B0%9A%E6%A0%BC%E5%90%8D%E5%9F%8E%E7%90%86%E6%83%B3%E5%AE%B6%E5%9B%AD%7C%E5%B0%9A%E6%A0%BC%E5%90%8D%E5%9F%8E%7C%E8%A5%BF%E5%9F%8E%E9%BE%99%E5%BA%AD; wmda_session_id_6289197098934=1587016636318-da7e293b-4269-d357; sessid=C78CAED3-51AB-3D92-7EFD-2F70D1A7DAE9; aQQ_ajkguid=ACE62308-78C8-4AC4-0FEE-D3C24566583C; lps=http%3A%2F%2Fcs.anjuke.com%2Fcommunity%2F%3Fkw%3D%25E6%25A0%2587%25E5%25BF%2597%25E6%25B5%2599%25E5%2595%2586%25E9%25BB%2584%25E8%258A%25B1%25E5%25BA%25A6%25E5%2581%2587%25E9%2585%2592%25E5%25BA%2597%25E5%2588%25AB%25E5%25A2%2585%26from%3Dsugg_hot%7Chttps%3A%2F%2Fcs.anjuke.com%2Fcommunity%2Fxingshac-q-cskyl%2F; ctid=27; twe=2; __xsptplusUT_8=1; 58tj_uuid=d740d68d-50c2-4363-96f1-f455dbe6da21; init_refer=https%253A%252F%252Fcs.anjuke.com%252Fcommunity%252Fxingshac-q-cskyl%252F; new_uv=1; als=0; new_session=0; _ga=GA1.2.236054312.1587022433; _gid=GA1.2.1254226487.1587022433; ajk_member_captcha=fffd3f4ae4619af045283bbd639eddd9; browse_comm_ids=810561%7C1060923%7C811032%7C810992%7C909341; _gat=1; xzfzqtoken=I92tn8PhJ2km4JbuBBrim9DtFcqxzfeqs03NQuFGi7%2BQ2NrEHUB1dbp20ULnBznuin35brBb%2F%2FeSODvMgkQULA%3D%3D; __xsptplus8=8.2.1587022432.1587022532.10%232%7Csp0.baidu.com%7C%7C%7C%25E5%25AE%2589%25E5%25B1%2585%25E5%25AE%25A2%7C%23%234zhAHVz6T1I0us0v0cDE8Y_-JZx_iD1y%23; propertys=x7onf3-q8vef9_xfxxtn-q8vecl_',
            'referer': 'https://cs.anjuke.com/sale/kaifu/?from=SearchBar',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
        }
    }
}
