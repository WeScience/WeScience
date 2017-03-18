'use strict';

import api from './api';

export default function users() {

    return {
        find: function(user_id, callback) {
            api().get('/api/user/' + user_id, callback);
        }
    }

}