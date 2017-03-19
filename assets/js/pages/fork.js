'use strict';

import api from '../api/api';

export default function fork() {
    return {
        init: function() {
          var projectName = $(".js-project-title").text();
          console.log("Fork Button found");
          $('.fork').click(function(e){
            //e.preventDefault();
            console.log("click");
            document.cookie="forked=true";
            document.cookie= "forked-project=" + projectName;
            window.location.replace("/new");
          })
        },
        forked: function(){
            var isForked;
            var re = new RegExp("forked" + "=([^;]+)");
            var value = re.exec(document.cookie);

            if(value != null || value != "false"){
              isForked = false;
            }
            else if(value == "true"){
              isForked = true;
            }
            else{
              isForked = false;
            }

          if(isForked){
            var basic = "Forked project: ";
            var prjct;
              var re = new RegExp("forked-project" + "=([^;]+)");
              var value = re.exec(document.cookie);
              if(value != null){
                prjct = unescape(value[1]);
              }
              else {
                prjct = null;
              }

            var output = basic + prjct;
            $("project-summary").text(output);
          }
        }
    };
};
