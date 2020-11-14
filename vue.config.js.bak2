const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
    /** 区分打包环境与开发环境
     * process.env.NODE_ENV==='production'  (打包环境)
     * process.env.NODE_ENV==='development' (开发环境)
     * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
     */



    transpileDependencies: [
        /* string or regex */
    ], // 是否为生产环境构建生成sourceMap?

    productionSourceMap: false, // 调整内部的webpack配置. // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    css: {
        // 将组件内部的css提取到一个单独的css文件（只用在生产环境）
        // 也可以是传递给 extract-text-webpack-plugin 的选项对象
        extract: true, // 允许生成 CSS source maps?
        sourceMap: false, // pass custom options to pre-processor loaders. e.g. to pass options to // sass-loader, use { sass: { ... } }
        loaderOptions: {}, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.
        modules: false
    }, // use thread-loader for babel & TS in production build // enabled by default if the machine has more than 1 cores

    parallel: require("os").cpus().length > 1, // PWA 插件相关配置 // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa

    pwa: {}, // configure webpack-dev-server behavior
    devServer: {
        disableHostCheck: true,
        // host: "0.0.0.0",
        https: false,
        hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
        proxy: null // string | Object
        // before: app => {}
    }, // 第三方插件配置

    pluginOptions: {
        // ...
    },

    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置
            config.plugins.push(
                new TerserPlugin({
                    terserOptions: {
                        ecma: undefined,
                        warnings: false,
                        parse: {},
                        compress: {
                            drop_console:true,
                            drop_debugger:true
                        },
                        mangle: true,
                        module: false,
                        output: null,
                        toplevel: false,
                        nameCache: null,
                        ie8: true,
                        keep_classnames: false,
                        keep_fnames: false,
                        safari10: true,
                    },
                })
            );
        }
    }


};