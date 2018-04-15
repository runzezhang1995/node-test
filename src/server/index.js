import 'babel-polyfill';
import {testProcessVideo, ocrImageWithDistance} from './rtsp/rtsp';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import Axios from 'Axios';
import fs from 'fs';

const app = express();

// app.use(express.bodyParser());

app.set('view engine', 'pug');
app.set('views', 'src/templates');

app.use(express.static('build/frontend'));
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json());

global.jsHost = 'http://localhost:8080';


app.get('/', async (req, res) => {
    console.log('start rendering home page');
    res.render('home_page', {
        js_host: global.jsHost,
        title: 'Title',
    });
});


app.post('/',(req,res) => {
    console.log('at get image');
    try {
        // const videoPath = req.body.videoPath;
        // testProcessVideo(videoPath, () => {
        //     console.log('success');
        //     res.json({
        //         success:true
        //     });
        // });
        ocrImageWithDistance((body) => {
            console.log(body);
            res.json({
                success:true,   
                string:body
            });
        });
    } catch (error) {
        res.json({
            success: false
        });
    }
    // const commandLine = 'ffmpeg -i "rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov" -f image2 -ss 1000 -vframes 1 -s 220*220 ./public/a.jpeg';

});



app.post('/image',(req,res) => {
    console.log('at get image');
    try {
        const videoPath = req.body.videoPath;
        testProcessVideo(videoPath, () => {
            console.log('success');
            res.json({
                success:true
            });
        });
        // ocrImageWithDistance((body) => {
        //     console.log(body);
        //     res.json({
        //         success:true,   
        //         string:body
        //     });
        // });
    } catch (error) {
        res.json({
            success: false
        });
    }
    // const commandLine = 'ffmpeg -i "rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov" -f image2 -ss 1000 -vframes 1 -s 220*220 ./public/a.jpeg';

});


const server = app.listen(8080,() => {
    const host = server.address().address;
    const port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
