'use strict';

import projects from '../api/projects';
import documents from '../api/documents';
import documentList from '../components/documentList';

export default {
    init: function() {
        this.loadProject();
        this.loadDocuments();
    },

    loadProject: function() {
        projects.find(1, function(response) {
            $('.js-project-readme').html(response.description);
            $('.js-project-title').html(response.project_name);
        });
    },

    loadDocuments: function() {
        documents.search(1, null, 0, 50, '', function(response) {
            let html = documentList.getHtml(response.data);
            if (!html) html = '<p>No Documents Found</p>';
            $('.project-documents').html(html);
        });
    }
}