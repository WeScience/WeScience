'use strict';

import $ from 'jquery';

const template = '<div class="conversation-item">\
    <div class="conversation-user">\
    <img src="[[avatar]]" width="60" alt="">\
    </div>\
    <div class="conversation-body">\
    <div class="name">\
    [[name]]\
    </div>\
    <div class="time hidden-xs">\
        [[created]]\
    </div>\
    <div class="text">\
        [[comment]]\
    </div>\
    </div>\
</div>';

export default {
    getHtml: function (results) {
        let html = '';
        $.each(results, function (index, event) {
            let currentTemplate = template;
            $.each(event, function (field, value) {
                currentTemplate = currentTemplate.replace('[[' + field + ']]', value);
            });
            html += currentTemplate;
        });
        return html;
    }
}