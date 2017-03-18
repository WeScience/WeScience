
console.log("Working");

var base_w = window.innerWidth / 2;
var base_h = window.innerWidth / 2;


for(var i = 0;i < 10;i++){
    $("#wrapper").append("<div class='circle"+i+" sub-border'></div>");
    //set current circle width
    $(".circle"+i).css("width",base_w - 40 * i);
    //set current circle height
    $(".circle"+i).css("height",base_h - 40 * i);
    //get half current width
    var cur_w = $(".circle"+i).width() / 2;
    //get half current height
    var cur_h = $(".circle"+i).height() / 2;
    
    if(i !== 0){
        //get half previous width
        var pre_w = $(".circle"+(i-1)).width() / 2;
        //get half previous height
        var pre_h = $(".circle"+(i-1)).height() / 2;
        //get previous position
        var pre_top = $(".circle"+(i-1)).position().top;
        var pre_left = $(".circle"+(i-1)).position().left;
        
        //set current position
        $(".circle"+i).css("top",pre_top + pre_h - cur_h);
        $(".circle"+i).css("left",pre_left + pre_w - cur_w);
        
        
    }else{//first circle        
        $(".circle"+i).css("top",0);
        $(".circle"+i).css("left",base_h - cur_w);
    }
    //rotate animation
    $(".circle"+i).css("-webkit-animation","spin "+(i+1)*1.5+"s infinite linear");
    $(".circle"+i).css("-moz-animation","spin "+(i+1)*1.5+"s infinite linear");
    $(".circle"+i).css("-o-animation","spin "+(i+1)*1.5+"s infinite linear");
    $(".circle"+i).css("-ms-animation","spin "+(i+1)*1.5+"s infinite linear");
}

'use strict';

// Importing jQuery in ES6 style
import $ from "jquery";
import dashboard from './pages/dashboard.js'

// We need to expose jQuery as global variable
window.jQuery = window.$ = $;

// ES6 import does not work it throws error: Missing jQuery
// using Node.js style import works without problems
require('bootstrap-sass');

if ($('.dashboard').length) dashboard().init();
