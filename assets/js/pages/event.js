'use strict';

import documents from '../api/documents';
import revisionList from '../components/revisionList';

export default {
    init: function() {
        documents.find(1, function(response) {
            $('.js-document-title').html(response.document_title);
            let download = revisionList.getHtml(response.events, 0, 1);
            let revisions = revisionList.getHtml(response.events, 1, 100);
            $('.revisions').html(revisions);
            $('.download').html(download);
        });
    }
}