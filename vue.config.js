/*
 * @Author: wangkun
 * @Date: 2021-11-22 10:09:21
 * @LastEditTime: 2021-11-22 16:19:54
 * @LastEditors: wangkun
 * @Description: 
 */
module.exports = {
    devServer: {
        host: '0.0.0.0'
    },
    lintOnSave: false,
    configureWebpack: {
        externals: {
            'AMap': 'AMap'
        }
    }
}