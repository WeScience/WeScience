'use strict';

import api from './api';

export default {
    search: function (documentId, userId, offset, limit, filter, callback) {

        let queryString = '';
        if (userId) queryString += 'user_id=' + userId;
        if (documentId) queryString += '&document_id=' + documentId;
        queryString += '&offset=' + offset +
            '&limit=' + limit +
            '&filter=' + filter;

        let url = '/api/comments' + '?' + queryString;

        api().get(url, callback);
    }
}