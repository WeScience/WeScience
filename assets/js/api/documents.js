'use strict';

import api from './api';

export default {
    find: function(document_id, callback) {
        api().get('/api/document/' + document_id, callback);
    },

    search: function (projectId, userId, offset, limit, filter, callback) {

        let queryString = '';
        if (userId !== null) queryString += 'user_id=' + userId;
        if (projectId !== null) queryString += 'project_id=' + projectId;

        queryString += '&offset=' + offset +
            '&limit=' + limit +
            '&filter=' + filter;

        let url = '/api/documents?' + queryString;

        api().get(url, callback);
    }
}