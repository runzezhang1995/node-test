import 'babel-polyfill';
import express from 'express';
import path from 'path';

const app = express();

app.get('/', (req, res) => {
    res.send('hello');
});

const server = app.listen(8888,() => {
    const host = server.address().address;
    const port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});