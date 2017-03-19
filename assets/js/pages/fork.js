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
          var isForked = function getCookie("forked")
          {
            var re = new RegExp(name + "=([^;]+)");
            var value = re.exec(document.cookie);
            if(value != null || value != "false"){
              return false;
            }
            else if(value == "true"){
              return true;
            }
            else{
              return false;
            }
            //return (value != null) ? unescape(value[1]) : null;
          }

          if(isForked){
            var basic = "Forked project: ";
            var prjct = function getCookie("forked-project")
            {
              var re = new RegExp(name + "=([^;]+)");
              var value = re.exec(document.cookie);
              return (value != null) ? unescape(value[1]) : null;
            }

            var output = basic + prjct;
            $("project-summary").text(output);
          }
        }
    };
};
