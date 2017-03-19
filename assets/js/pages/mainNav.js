'use strict';

import api from '../api/api';

export default function mainNav() {
    return {
        init: function() {
            console.log("NavFix");
            if(window.innerWidth < 768)
            {
                $("#navToggle").appendTo(".row")
            }
        }
    };
};
