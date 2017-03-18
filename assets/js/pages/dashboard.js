'use strict';

import projects from '../api/projects';

export default function dashboard() {
    return {
        init: function() {
            projects().search(null, function(response) {
                console.log(response);
            });
        }
    };
};