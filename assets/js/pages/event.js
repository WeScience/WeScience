'use strict';

import documents from '../api/documents';
import comments from '../api/comments';
import revisionList from '../components/revisionList';
import commentList from '../components/commentList';

export default {
    init: function() {
        this.loadDownloads();
        this.loadComments();
    },

    loadDownloads: function() {
        documents.find(1, function(response) {
            $('.js-document-title').html(response.document_title);
            let download = revisionList.getHtml(response.events, 0, 1);
            let revisions = revisionList.getHtml(response.events, 1, 100);
            $('.revisions').html(revisions);
            $('.download').html(download);
        });
    },

    loadComments: function() {
        comments.search(1, 1, 0, 10, '', function(response) {
            let comments = commentList.getHtml(response.data);
            $('.conversation-log').html(comments);
        });
    }
}