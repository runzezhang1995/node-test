import 'babel-polyfill';
import {testProcessVideo, ocrImageWithDistance} from './rtsp/rtsp';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import Axios from 'Axios';
import fs from 'fs';

const app = express();


// app.use(express.bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



app.get('/', async (req, res) => {
    fs.readFile('./public/test2.jpg','binary', (err, file) => {
        if (err) throw err; // Fail if the file can't be read.
        res.writeHead(200, {'Content-Type': 'image/jpeg'});

        res.write(file, 'binary'); // Send the file data to the browser.
        res.end();
    });
});


app.post('/',(req,res) => {
    console.log('at get image');

    try {
        const videoPath = req.body.videoPath;
        // testProcessVideo(videoPath, () => {

        ocrImageWithDistance((body) => {
            console.log(body);
            res.send(body);
        });

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