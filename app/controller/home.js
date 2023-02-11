'use strict'

const { Controller } = require('egg')

const { qrGenerate, stateQuery } = require('../drive/aliyun')

class HomeController extends Controller {
    async index() {
        const { ctx } = this
        let { t, ck, content } = await qrGenerate(ctx)
        ctx.body = { t, ck, content }
    }
}

module.exports = HomeController
