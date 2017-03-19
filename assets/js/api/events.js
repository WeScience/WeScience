'use strict';

import api from './api';

export default function events() {

    return {
        search: function(projectId, userId, offset, limit, filter, callback) {

            let queryString = 'user_id=' + userId +
                    '&offset=' + offset +
                    '&limit=' + limit +
                    '&filter=' + filter;

            let url = '/api/project/events/' + projectId + '?' + queryString;

            api().get(url, callback);
        }
    }

}