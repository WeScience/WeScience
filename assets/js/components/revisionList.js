'use strict';

import $ from 'jquery';

const template = '<li>\
    <i class="fa fa-download"></i> &nbsp; <a href="[[filename]]">[[filename]] (version [[revision]])</a><br>\
<small>12th March 2017</small>\
</li>';

export default {
    getHtml: function(revisions, offset, limit) {
        let html = '';
        let count = 0;
        $.each(revisions, function(index, revision) {
            let currentTemplate = template;
            if (offset <= count && count < limit) {
                $.each(revision, function(field, value) {
                    currentTemplate = currentTemplate.replace('[[' + field + ']]', value);
                });
                html += currentTemplate;
            }
            count++;
        });
        if (!html && offset > 0) html = 'No Revisions Yet';
        return html;
    }
}