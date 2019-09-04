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

        }
    }

}