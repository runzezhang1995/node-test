import $ from 'jquery';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery-form';
import moment from 'moment';



$(() => {
    

    $('#refreshButton').click(() => {
        $('#refreshButton').text('Obtaining...');
        $.ajax({
            type: 'POST',
            url: `/`,
            data:{
                videoPath:'rtsp://192.168.0.101:554/cam1/mpeg4'
            },
            success: (response) => {
                $('#refreshButton').text('Refresh');
                
                if (response.success) {
                    console.log(response); 
                    $('#real-timeReadingTF').val(response.string);   
                    $('#timeStampTF').val(moment().format('YYYY-MM-DD HH:mm:ss'));
                    
                } else {
                    console.log('error');
                    console.log(response);
                }
            },
        });
    });

    $('#getNumberForm').ajaxForm((response) => {
    console.log('at ajax form');
    console.log(response);

  });  
});