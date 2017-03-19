'use strict';

import events from '../api/events';

export default function commits() {
    return {

        totalCommits: null,

        init: function() {
            const _this = this;
            events().search(1, 1, 0, 10, '', function(response) {
                _this.totalCommits = response.total;
                $.each(response.data, function(index, val) {
                    console.log(val);
                });
            });
        }
    };
};