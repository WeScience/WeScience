'use strict';

import $ from 'jquery';

const template = '<a class="project-stub" href="/project/[[project_id]]">\
    <h3>[[project_name]]</h3>\
    <i class="fa fa-anchor"></i>\
    <p>[[description]]</p>\
    <p>Created: [[created]]</p>\
    <p>Last Update: [[last_updated]]</p>\
    </a>';

export default {
    getHtml: function(results) {
        let html = '';
        $.each(results, function(index, notification) {
            let currentTemplate = template;
            $.each(notification, function(field, value) {
                currentTemplate = currentTemplate.replace('[[' + field + ']]', value);
            });
            html += currentTemplate;
        });
        return html;
    }
}