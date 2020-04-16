import log4js = require('log4js')

export const getLogger = function (name: string) {
    let logger = log4js.getLogger(name)
    logger.level = 'debug'
    return logger
}
