import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



$(() => {
    console.log('test');
    $('#searchCardForm').ajaxForm((response) => {
        console.log(response);
    });


});