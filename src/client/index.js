import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


console.log('test');    

$(() => {
    console.log('test');    
    console.log('test');    
    

    $('#getNumberForm').ajaxForm((response) => {
      console.log(response);
      $('#resultField').text  = response;
    });  
});