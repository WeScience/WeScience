'use strict';

import users from '../api/users';

export default function profile() {
    return {
        init: function() {
            console.log("H");
            users().find(1, function(response) {
                console.log(response);
            });
        }
    };
};