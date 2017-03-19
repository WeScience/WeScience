'use strict';

const template = '<li> \
    <span><a href="/profile/[[user_id]]">[[name]]</a> commented on your document</span> \
    <time>[[created]]</time> \
    <a href="/project/[[project_id]]/[[document_id]]" class="view">view</a> \
    </li>';

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