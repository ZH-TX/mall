module.exports={
    configureWebpack:{
        resolve:{
            extensions:[],
            // 配置好别名
            alias:{
                "@":"src",
                "assets":"@/assets",
                "common":"@/common",
                "components":"@/components",
                "network":"@/network",
                "view":"@/view",
                
            }

        }
    }

}