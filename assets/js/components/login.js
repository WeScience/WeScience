'use strict';

import api from '../api/api';

export default function login() {
    return {
        init: function() {
            if($("#contact-form").length){
              $("#contact-form").submit(function(){
                 document.cookie = "status=logged-in";
              });
            }

            if($("#log-out").length){
              $("#log-out").click(function(){
                document.cookie = "status=logged-out";
                window.location.replace("/");
              })
            }

        }
    };
};
