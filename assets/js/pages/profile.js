'use strict';

import users from '../api/users';
import projects from '../api/projects';
import projectList from '../components/projectList';

export default function profile() {
    return {
        init: function() {
            this.loadProfile();
            this.loadProjects();
        },

        loadProfile: function() {
            users.find(1, function(response) {
                $.each(response, function(fieldName, value) {
                    $('.js-' + fieldName).html(value);
                });

                $('.js-avatar-image').attr('src', response.avatar);
            });
        },

        loadProjects: function() {
            projects.search(0, 1, 0, 12, '', function(response) {
                let html = projectList.getHtml(response.data);
                if (!html) html = '<p>No Projects Found</p>';
                $('.project-list-private').html(html);
            });
            projects.search(1, 1, 0, 12, '', function(response) {
                let html = projectList.getHtml(response.data);
                if (!html) html = '<p>No Projects Found</p>';
                $('.project-list-public').html(html);
            });
        }
    };
};