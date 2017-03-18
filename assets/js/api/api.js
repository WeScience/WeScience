'use strict';

import $ from 'jquery';

export default function api() {
    return {
        get: function(url, callback) {
            $.get(url, function(response) {
                callback(response);
            }, 'json');
        }
    }
}