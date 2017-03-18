'use strict';

export default function home() {
    return {
        init: function () {
            console.log("Working");

            let base_w = window.innerWidth / 2;
            let base_h = window.innerWidth / 2;


            for (let i = 0; i < 10; i++) {
                $("#wrapper").append("<div class='circle" + i + " sub-border'></div>");
                //set current circle width
                $(".circle" + i).css("width", base_w - 40 * i);
                //set current circle height
                $(".circle" + i).css("height", base_h - 40 * i);
                //get half current width
                let cur_w = $(".circle" + i).width() / 2;
                //get half current height
                let cur_h = $(".circle" + i).height() / 2;

                if (i !== 0) {
                    //get half previous width
                    let pre_w = $(".circle" + (i - 1)).width() / 2;
                    //get half previous height
                    let pre_h = $(".circle" + (i - 1)).height() / 2;
                    //get previous position
                    let pre_top = $(".circle" + (i - 1)).position().top;
                    let pre_left = $(".circle" + (i - 1)).position().left;

                    //set current position
                    $(".circle" + i).css("top", pre_top + pre_h - cur_h);
                    $(".circle" + i).css("left", pre_left + pre_w - cur_w);


                } else {//first circle
                    $(".circle" + i).css("top", 0);
                    $(".circle" + i).css("left", base_h - cur_w);
                }
                //rotate animation
                $(".circle" + i).css("-webkit-animation", "spin " + (i + 1) * 1.5 + "s infinite linear");
                $(".circle" + i).css("-moz-animation", "spin " + (i + 1) * 1.5 + "s infinite linear");
                $(".circle" + i).css("-o-animation", "spin " + (i + 1) * 1.5 + "s infinite linear");
                $(".circle" + i).css("-ms-animation", "spin " + (i + 1) * 1.5 + "s infinite linear");
            }
        }
    }
}