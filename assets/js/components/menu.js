'use strict';

import api from '../api/api';

export default function menu() {
    return {
        init: function() {
          if(document.cookie == "status=logged-in"){
            console.log("cookie logged in");
              $("#logged-out").hide();
              $("#logged-in").show();
          }
          else {
            $("#logged-in").hide();
            $("#logged-out").show();
          }

        }
    };
};
