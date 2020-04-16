import * as _ from 'lodash'

export const randomWait = function (ms = 1000) {
    let min = ms * 0.7
    let max = ms * 1.3

    let ws = _.random(min, max)
    return wait(ws)
}


export const wait = function (ms = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, ms)
    })
}
