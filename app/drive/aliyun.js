/**
 * 生成二维码
 */
const qrGenerate = async (ctx) => {
    let url = `https://passport.aliyundrive.com/newlogin/qrcode/generate.do?appName=aliyun_drive&fromSite=52&appName=aliyun_drive&appEntrance=web&isMobile=false&lang=zh_CN&returnUrl=&bizParams=&_bx-v=2.0.31`
    const result = await ctx.curl(url, {
        method: 'GET',
        dataType: 'json',
    })
    console.log(result.data)
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
    })
    console.log(result.data)
}

module.exports = { qrGenerate, stateQuery }
