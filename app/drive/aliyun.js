/**
 * 生成二维码
 */
const qrGenerate = async (ctx) => {
    let url = `https://passport.aliyundrive.com/newlogin/qrcode/generate.do?appName=aliyun_drive&fromSite=52&appName=aliyun_drive&appEntrance=web&isMobile=false&lang=zh_CN&returnUrl=&bizParams=&_bx-v=2.0.31`
    const result = await ctx.curl(url, {
        method: 'GET',
        dataType: 'json',
        heaers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
            origin: 'https://www.aliyundrive.com',
        },
    })
    console.log(result.data)
    return result.data.content.data
}
/**
 * 查询状态 获取二维码状态
 */
const stateQuery = async (ctx, { t, ck }) => {
    let url = `https://passport.aliyundrive.com/newlogin/qrcode/query.do?appName=aliyun_drive&fromSite=52&_bx-v=2.0.31`
    let result = await ctx.curl(url, {
        method: 'POST',
        dataType: 'json',
        data: {
            t,
            ck,
            appName: 'aliyun_drive',
            appEntrance: 'web',
            isMobile: 'false',
            lang: 'zh_CN',
            returnUrl: '',
            fromSite: '52',
            bizParams: '',
            navlanguage: 'zh-CN',
            navPlatform: 'MacIntel',
        },
        heaers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
            origin: 'https://www.aliyundrive.com',
        },
    })
    console.log(result.data)
    return result.data.content.data
}

/**
 * 刷新token
 * @param {*} ctx
 * @param {*} refresh_token
 */
const refreshToken = async (ctx, refresh_token) => {
    let url = `https://auth.aliyundrive.com/v2/account/token`
    let result = await ctx.curl(url, {
        method: 'POST',
        dataType: 'json',
        data: {
            grant_type: 'refresh_token',
            app_id: 'pJZInNHN2dZWk8qg',
            refresh_token,
        },
    })
    console.log(result.data)
    return result.data
}

module.exports = { qrGenerate, stateQuery, refreshToken }
