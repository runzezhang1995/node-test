import ffmpeg from 'fluent-ffmpeg';
import FormData from 'form-data';
import axios from 'axios';
import fs from 'fs';
import request from 'request';

// const $ = require('https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js');

function testProcessVideo(videoPath, finishHandler) {
    console.log(videoPath);   
    let counter = 0; 
    
    const command = ffmpeg(videoPath)
    .on('start', (commandLine) => {
        console.log('Spanwed FFmpeg command :' + commandLine);
    }).on('end', () => {
        finishHandler({
            success:true
        });            
        console.log('finished');
    })
    .on('error', function(err, stdout, stderr) {
        console.log('Cannot process video: ' + err.message);
        finishHandler({
            success:false,
            error:err
        });
      })
      .addOptions([
        '-f image2',
        '-ss 00:00:01',
        '-vframes 1',
        '-s 640*480'
    ])
    .save('./public/output.png');
   
    
    // ffmpeg -i "rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov" -f image2 -ss 1000 -vframes 1 -s 220*220 ./public/a.jpeg
}


function ocrImageWithDistance(finishHandler) {
   
    const data = {
        'image': fs.createReadStream('./public/output.png')
    };	
    const url = 'https://australiaeast.api.cognitive.microsoft.com/vision/v1.0/ocr';

    var options = { method: 'POST',
      url: url,
      qs: { language: 'en', detectOrientation: 'true' },
      headers: 
       { 
         'Content-Type': 'multipart/form-data',
         'Ocp-Apim-Subscription-Key': '54f31a5d73b34973ad3db73c4d317d4f',
        },
      formData: data
     };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        finishHandler(processOCRBody(body));     
    });

}

function processOCRBody(bodyString) {
    const body = JSON.parse(bodyString);
    let resultString = '';
    console.log(body.regions);

    body.regions.forEach((region) => {
        region.lines.forEach((line) => {
            line.words.forEach((word) => {    
                resultString += word.text + ' ';                        
            }, this);
        }, this);
    }, this);

    return resultString;
    
}



export {testProcessVideo, ocrImageWithDistance};
