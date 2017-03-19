'use strict';

import comments from '../api/comments';
import notificationList from '../components/notificationList';

export default function dashboard() {
    return {
        init: function() {
            comments.search(null, 1, 0, 10, '', function(response) {
                const html = notificationList.getHtml(response.data);
                $('.notifications').html(html);
            });
        }
    };
};