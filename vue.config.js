const path = require("path");
//less文件的路径
const myVantStyle = path.resolve(__dirname, "./src/assets/less/vantChange.less");

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                'utils': '@/utils',
                // 'store': '@/store',
            }
        }
    },
    css: {
        loaderOptions: {
            less: {
                // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
                // lessOptions: {}
                modifyVars: {
                    // 通过 less 文件覆盖（文件路径为绝对路径）
                    hack: `true; @import "${myVantStyle}";`,
                },
            },
        },
    },
    devServer: {
        //解决跨域问题
        proxy: {
            // 目的将 /api 替换成 https://c0rn.top/
            '/api': {
                target: 'https://c0rn.top/',
                // target: 'https://c0rn-music-api.vercel.app/',
                // target: 'https://c0rn-music.vercel.app/',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
