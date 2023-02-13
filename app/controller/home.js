'use strict'

const { Controller } = require('egg')

const { qrGenerate, stateQuery } = require('../drive/aliyun')
const { success, failure } = require('../extend/response')

class HomeController extends Controller {
    async index() {
        const { ctx } = this
        let { t, ck, content } = await qrGenerate(ctx)

        if (t) {
            success({ ctx, data: { t, ck, content } })
        } else {
            failure({ ctx, message: '获取二维码失败' })
        }
    }

    async state() {
        const { ctx } = this
        let { t, ck } = ctx.request.body
        const status = {
            NEW: '请用阿里云盘 App 扫码',
            SCANED: '请在手机上确认',
            EXPIRED: '二维码已过期',
            CANCELED: '已取消',
            CONFIRMED: '已确认',
        }

        if (t && ck) {
            let result = await stateQuery(ctx, { t, ck })
            if (result.qrCodeStatus == 'CONFIRMED') {
                console.log(result.data)
                // 获取bizExt
                let { bizExt } = result.data
                // base64解码
                let base64 = Buffer.from(bizExt, 'base64').toString()
                console.log(base64)
                let resutData = JSON.parse(base64).pds_login_result
                console.log(resutData)
                let access_token = resutData.access_token
                let expireTime = resutData.expireTime
                let driverId = resutData.defaultDriveId
                let refreshToken = resutData.refresh_token
                success({ ctx, data: { access_token, refreshToken, expireTime, driverId } })
            } else {
                success({ ctx, message: status[result.qrCodeStatus] })
            }
        } else {
            failure({ ctx, message: '参数错误' })
        }
    }
}

module.exports = HomeController
