import 'babel-polyfill';
import {testProcessVideo, ocrImageWithDistance} from './rtsp/rtsp';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import Axios from 'Axios';
import fs from 'fs';
import errorHandler from './errorHandler';


const app = express();
let cameras = [];



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
        cameras,
    });
});


app.post('/',(req,res) => {
    console.log('at get image');
    try {
        const videoPath = req.body.videoPath;
        if(req.body.videoPath) {        
        } else {   
            throw new Error('no video path');
        }
        
        testProcessVideo(videoPath, (result) => {
            if(result.success) {
                console.log('success get image');
                ocrImageWithDistance((body) => {
                    console.log('success get string');
                    console.log(body);
                    res.json({
                        success:true,   
                        string:body
                    });
                });
            } else {
                console.log('ffmpeg fail');
                res.json({
                    success:false,
                    error:result.error.message
                })
            }
        });
        
    } catch (error) {
        console.log('catch error');
        res.json({
            success: false,
            error:error.message,
        });
    }
    // const commandLine = 'ffmpeg -i "rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov" -f image2 -ss 1000 -vframes 1 -s 220*220 ./public/a.jpeg';

});



app.post('/camera',(req,res) => {
    console.log('At camera');
    const id = req.body.id;
    const ip = req.body.ip;
    
    if(!id || !ip) {
        throw new Error('no valid ip address or id');
    }

    cameras.forEach(camera => {
        if(camera.id === id) {
            throw new Error('id is already exist');
        }
    });
    cameras.push({
        id,
        ip,
    });
    res.json({
        success:true,
        cameras,
    });
    // const commandLine = 'ffmpeg -i "rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov" -f image2 -ss 1000 -vframes 1 -s 220*220 ./public/a.jpeg';
});

app.get('/camera',(req,res) => {
    res.json({
        success:true,
        cameras,
    });
    // const commandLine = 'ffmpeg -i "rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov" -f image2 -ss 1000 -vframes 1 -s 220*220 ./public/a.jpeg';
});

app.delete('/camera',(req,res) => {
    cameras = [];
    res.json({
        success:true
    });
})



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


app.use(errorHandler);


const server = app.listen(8080,() => {
    const host = server.address().address;
    const port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
});
