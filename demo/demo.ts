import { TaskQueue } from '../src/crawl/TaskQueue'

let q = new TaskQueue


const main = async function () {
    return q.request({
        url: 'https://cs.anjuke.com/community/view/1215049'
    })
}


main().then(
    res => console.log(res),
    err => console.error(err)
)
