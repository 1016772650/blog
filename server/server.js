/**
 * Created by vijay on 2018/2/11.
 */
import path from 'path';
import Express from 'express';
import favicon from 'serve-favicon';
import httpProxy from 'http-proxy';
import compression from 'compression';
import connectHistoryApiFallback from 'connect-history-api-fallback';
import config from '../config/config';

const app = new Express();
const port = config.port;
const targetUrl = `http://${config.apiHost}:${config.apiPort}`;
const proxy = httpProxy.createProxyServer({
    target: targetUrl
});

app.use('/api', (req,res) => {
    proxy.web(req, res, {target: targetUrl});
    proxy.on('error', function (err, req, res) {
        // res.writeHead(500, {
        //     'Content-type': 'text/plain'
        // });
        res.end('Something went wrong.')
    });
});

app.use('/', connectHistoryApiFallback());
app.use('/', Express.static(path.join(__dirname, "..", "build")));
app.use('/', Express.static(path.join(__dirname, "..", "static")));

app.use(compression());
app.use(favicon(path.join(__dirname, "..", 'static', 'favicon.ico')));

// 热更新
if (process.env.NODE_EVN !== 'production') {
    const Webpack = require('webpack');
    const WebpackDevMiddleware = require('webpack-dev-middleware');
    const WebpackHotMiddleware = require('webpack-hot-middleware');
    const WebpackConfig = require('../webpack.dev');

    const compiler = Webpack(WebpackConfig);

    app.use(WebpackDevMiddleware(compiler, {
        publicPath: '/',
        status: {color: true},
        lazy: false,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        },
    }));

    app.use(WebpackHotMiddleware(compiler));

}

app.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`===>open http://${config.host}:${config.port} in a browser to view the app`);
    }
});


