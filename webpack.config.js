const path = require('path');
module.exports = {
    target: "web",
    mode: 'production',
    entry: {
        app: ["none"]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "raw.js",
    },
    devServer: {
        host: '192.168.0.14', // Required for docker
        static: {
            directory: path.join(__dirname, 'build'),
        },
        compress: true,
        port: 9000,
    },
    devtool: 'inline-source-map',
}