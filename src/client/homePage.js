import $ from 'jquery';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery-form';
import moment from 'moment';

let cameras = [];
let timer;
let keepTry = false;
let currentIp = '';

function recognizeImageFromServer (){

    if(!keepTry) {
        return;
    }

    $('#refreshButton').text('Obtaining...');
    console.log('start to call api...');
    
    let timeInterval =  parseInt($('#updateIntervalTF').val(), 10) * 1000;  
    if(!timeInterval) {
        timeInterval = 5000;
    }

    $.ajax({
        type: 'POST',
        url: `/`,
        data:{
            videoPath:currentIp
        },
        success: (response) => {
            if(!keepTry) {
                return;
            }
            
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
        error:(jqSHR, status, error) => {
            if(!keepTry) {
                return;
            } 
            $('#refreshButton').text('Refresh');
            console.log('error');
            timer = setTimeout(()=> {
                recognizeImageFromServer();
            }, timeInterval);
        },
        timeout:10000,      
    });
}


$(() => {
    
    cameras = JSON.parse($('#cameras').val());
    console.log(cameras);
    cameras.forEach(camera => {
        console.log(camera.ip);
        $('#dropDownMenu').append(`
            <li class='device-item' data-id=${camera.id} data-ip=${camera.ip}>  
                <a> ${camera.id} </a>
            </li>
        `);
    });

    $('.device-item').click((event) =>{
        const target = event.currentTarget;
        currentIp = target.dataset.ip;

        console.log(target.dataset.id);
        console.log(target.dataset.ip);
        $('#deviceIPTF').val(target.dataset.ip);
        $('#device-selection').text(target.dataset.id);
        $('#refreshButton').text('Refresh');
        $('#real-timeReadingTF').val('');   
        $('#timeStampTF').val('');
        keepTry = false;
        clearTimeout(timer);
    });


    

    $('#refreshButton').click(() => {
        keepTry = true;
       recognizeImageFromServer();
    }); 

    $('#getNumberForm').ajaxForm((response) => {
    console.log('at ajax form');
    console.log(response);

  });  
});