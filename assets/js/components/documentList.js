'use strict';

import $ from 'jquery';

const template = '\
    <li>\
    <i class="fa fa-eye"></i>\
    <a href="#">[[document_title]]</a>\
    <small>last updated [[last_updated]], revision [[revision]]</small>\
    </li>\
    ';

export default {
    getHtml: function(results) {
        let html = '';
        let currentType = '';
        $.each(results, function(index, notification) {
            if (currentType !== notification.document_type) {
                if (currentType !== '') html += '</ul>';
                html += '<h3>' + notification.document_type + '</h3><ul>';
                currentType = notification.document_type;
            }
            let currentTemplate = template;
            $.each(notification, function(field, value) {
                currentTemplate = currentTemplate.replace('[[' + field + ']]', value);
            });
            html += currentTemplate;
        });
        return html;
    }
}