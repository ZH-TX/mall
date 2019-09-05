module.exports={
    configureWebpack:{
        resolve:{
            extensions:['.vue',".css",'.js'],
            // 配置好别名
            alias:{
                'components': '@/components',
                'content': 'components/content',
                'common': 'components/common',
                'assets': '@/assets',
                'network': '@/network',
                'views': '@/views',
                
            }

        },

        // 跨域配置
        devServer: {
            proxy: {
                //名字可以自定义，这里我用的是api
                '/api': {
                  target: 'http://openapi.qingtaoke.com/search',//设置你调用的接口域名和端口号 别忘了加http
                  changeOrigin: true,//这里设置是否跨域
                  pathRewrite: {
                    '^/api': ''
                  }
                }
            }
        }
    }

}