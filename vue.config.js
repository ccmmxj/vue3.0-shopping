module.exports = {
    lintOnSave: false,
    devServer: {
        port: 5999
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'development') {
            config.devtool = 'source-map'
            // mutate config for production...
        }
    }
}