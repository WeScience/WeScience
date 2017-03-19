'use strict';

import $ from "jquery";

const template = '\
<li> \
    <img src="[[avatar]]" class="img-rounded" width="40" height="40"> \
    <strong>[[created]]</strong> \
    <a href="#">[[name]]</a> \
    updated \
    <a href="/projects/[[project_id]]/[[document_id]]">[[document_title]]</a> \
</li>\
';

export default function commitList() {
    return {
        getHtml: function(results) {
            let html = '';
            $.each(results, function(index, event) {
                let currentTemplate = template;
                $.each(event, function(field, value) {
                    currentTemplate = currentTemplate.replace('[[' + field + ']]', value);
                });
                html += currentTemplate;
            });
            return html;
        }
    }
}