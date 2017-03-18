'use strict';

import api from './api';

export default function projects() {

    return {
        search: function(user_id, callback) {
            api().get('/api/comments/' + 1, callback);
        }
    }

}