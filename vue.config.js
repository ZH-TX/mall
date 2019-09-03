module.exports={
    configureWebpack:{
        resolve:{
            extensions:['.Vue',".css",'.js'],
            // 配置好别名
            alias:{
                // "@":"src",
                "assets":"@/assets",
                // "common":"@/common",
                "components":"@/components",
                "network":"@/network",
                "views":"@/views",
                'content': 'components/content',
                'common': 'components/common',
                
            }

        }
    }

}