import ffmpeg from 'fluent-ffmpeg';
import FormData from 'form-data';
import axios from 'axios';
import fs from 'fs';

// const $ = require('https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js');

function testProcessVideo(videoPath, finishHandler) {
    const command = ffmpeg(videoPath)
    .on('start', (commandLine) => {
        console.log('Spanwed FFmpeg command :' + commandLine);
    }).on('end', () => {
        finishHandler();
        console.log('finished');
    }).addOptions([
        '-f image2',
        '-ss 00:00:01',
        '-vframes 1',
        '-s 640*480'
    ])
    .save('./public/output.png')
    .run();

    // ffmpeg -i "rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov" -f image2 -ss 1000 -vframes 1 -s 220*220 ./public/a.jpeg
}


function ocrImageWithDistance(finishHandler) {
    // fs.readFile('./public/test2.jpg', 'binary', (err, file) => {
    //     if(err) {
    //         console.log('fail to read image file');
    //         return;
    //     } else {
    //         fs.writeFile('./rewrite.png', file, 'binary', (error) => {
    //             if(error) {
    //                 console.log('error'+error);
    //             } else {
    //                 console.log('save image success');
    //             }
    //         });
    //         const formData = new FormData();
    //         formData.append('image', file);
    //         const url = 'https://australiaeast.api.cognitive.microsoft.com/vision/v1.0/ocr?language=en&detectOrientation =true HTTP/1.1';
    //         const config = {
    //             headers:  {
    //                 'Postman-Token': 'b7f9eedf-c2c4-2b37-25fd-2811a77610d8',
    //                 'Cache-Control': 'no-cache',
    //                 // 'Content-Type': 'multipart/form-data',
    //                 'Ocp-Apim-Subscription-Key': '54f31a5d73b34973ad3db73c4d317d4f',
    //                 'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
    //         }
    //         // const data = `{"url":"http://3.bp.blogspot.com/-kGIq_PcBBAM/UFLT91dUXVI/AAAAAAAAARM/pl9OmhVnRqI/s1600/Google+idcard.jpg"}`;
    //         // axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';

    //         axios.post(url, null ,config).then( res => {
    //             console.log(res.data);
    //             finishHandler(res);
    //         }).catch( res => {
    //             console.log(res);
    //             finishHandler(res.data);
    //         });

    //         // formData.append('image', data, 'output.png');
    //         // console.log(formData);



    //         // $.ajax({
    //         //     url: 'https://australiaeast.api.cognitive.microsoft.com/vision/v1.0/ocr?language=en&detectOrientation =true HTTP/1.1',
    //         //     beforeSend: function(xhrObj){
    //         //         // Request headers
    //         //         xhrObj.setRequestHeader("Content-Type","multipart/form-data");
    //         //         xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","54f31a5d73b34973ad3db73c4d317d4f");
    //         //     },
    //         //     type: "POST",
    //         //     // Request body
    //         //     data: formData,
    //         //     error: (jqXHR, textStatus, errorThrown) => {
    //         //         console.log(jqXHR.responseText);
    //         //         finishHandler(jqXHR.responseJSON);
    //         //     }
    //         // }).done((data) => {
    //         //     console.log('1234');
    //         //     finishHandler(data);
    //         // });
    //     }
    // });
    var fs = require("fs");
    var request = require("request");

    var options = { method: 'POST',
      url: 'https://australiaeast.api.cognitive.microsoft.com/vision/v1.0/ocr',
      qs:
       { language: 'en',
         'detectOrientation ': 'true HTTP/1.1',
         'detectOrientation%20': 'true%20HTTP/1.1' },
      headers:
       { 'Postman-Token': '5da426ad-467d-1205-f4f8-bf62cd458566',
         'Cache-Control': 'no-cache',
         'Content-Type': 'multipart/form-data',
         'Ocp-Apim-Subscription-Key': '54f31a5d73b34973ad3db73c4d317d4f'},
        //  'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
      formData:
       { image:
          { value: 'fs.createReadStream("E:\\Developer\\node-test\\public\\test2.jpg")',
            options:
             { filename: 'E:\\Developer\\node-test\\public\\test2.jpg',
               contentType: null } } } };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);

      console.log(body);
    });

}



export {testProcessVideo, ocrImageWithDistance};
