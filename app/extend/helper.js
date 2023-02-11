'use strict'
const crypto = require('crypto')
const PICKED_OPTION_FIELDS = ['url', 'device', 'userAgent', 'extraHeaders']
const MAX_KEY_LENGTH = 10

module.exports = {
    /**
     * @param {!number} milliseconds
     * @return {!Promise}
     */
    delay(milliseconds) {
        return new Promise((_resolve) => setTimeout(_resolve, milliseconds))
    },

    /**
     * @param {!string} src
     * @return {!string}
     */
    hash(src) {
        const md5hash = crypto.createHash('md5')
        md5hash.update(src, 'utf8')
        return md5hash.digest('hex')
    },

    /**
     * @param {!string} src
     * @return {!string}
     */
    sha256(src) {
        const sha256hash = crypto.createHash('sha256')
        sha256hash.update(src, 'utf8')
        return sha256hash.digest('hex')
    },

    /**
     * @param {!Object} options
     * @return {!string}
     */
    generateKey(options) {
        const json = JSON.stringify(pick(options, PICKED_OPTION_FIELDS), Helper.jsonStableReplacer)
        return Helper.hash(json).substring(0, MAX_KEY_LENGTH)
    },
}
