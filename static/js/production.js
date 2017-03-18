(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

console.log("Working");

var base_w = window.innerWidth / 2;
var base_h = window.innerWidth / 2;

for (var i = 0; i < 10; i++) {
    $("#wrapper").append("<div class='circle" + i + " sub-border'></div>");
    //set current circle width
    $(".circle" + i).css("width", base_w - 40 * i);
    //set current circle height
    $(".circle" + i).css("height", base_h - 40 * i);
    //get half current width
    var cur_w = $(".circle" + i).width() / 2;
    //get half current height
    var cur_h = $(".circle" + i).height() / 2;

    if (i !== 0) {
        //get half previous width
        var pre_w = $(".circle" + (i - 1)).width() / 2;
        //get half previous height
        var pre_h = $(".circle" + (i - 1)).height() / 2;
        //get previous position
        var pre_top = $(".circle" + (i - 1)).position().top;
        var pre_left = $(".circle" + (i - 1)).position().left;

        //set current position
        $(".circle" + i).css("top", pre_top + pre_h - cur_h);
        $(".circle" + i).css("left", pre_left + pre_w - cur_w);
    } else {
        //first circle        
        $(".circle" + i).css("top", 0);
        $(".circle" + i).css("left", base_h - cur_w);
    }
    //rotate animation
    $(".circle" + i).css("-webkit-animation", "spin " + (i + 1) * 1.5 + "s infinite linear");
    $(".circle" + i).css("-moz-animation", "spin " + (i + 1) * 1.5 + "s infinite linear");
    $(".circle" + i).css("-o-animation", "spin " + (i + 1) * 1.5 + "s infinite linear");
    $(".circle" + i).css("-ms-animation", "spin " + (i + 1) * 1.5 + "s infinite linear");
}

},{}]},{},[1]);
