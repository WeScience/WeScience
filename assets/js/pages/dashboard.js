'use strict';

import comments from '../api/comments';
import projects from '../api/projects';
import notificationList from '../components/notificationList';
import projectList from '../components/projectList';

export default function dashboard() {
    return {
        init: function() {
            this.loadProjects();
            this.loadComments();
        },

        loadComments: function() {
            comments.search(null, 1, 0, 10, '', function(response) {
                const html = notificationList.getHtml(response.data);
                $('.notifications').html(html);
            });
        },

        loadProjects: function() {
            projects.search(null, 1, 0, 12, '', function(response) {
                const html = projectList.getHtml(response.data);
                $('.project-list').html(html);
            });
        },

    };
};