'use strict';

import users from '../api/users';

export default function profile() {
    return {
        init: function() {
            users().find(1, function(response) {
                $.each(response, function(fieldName, value) {
                    $('.js-' + fieldName).html(value);
                });

                $('.js-avatar-image').attr('src', response.avatar);
            });
        }
    };
};