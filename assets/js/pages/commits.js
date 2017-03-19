'use strict';

import events from '../api/events';
import commitList from '../components/commitList';
import pagination from '../components/pagination';

export default function commits() {
    return {

        totalCommits: null,

        perPage: 20,

        currentOffset: 0,

        init: function () {
            this.load();
        },

        load: function () {
            const _this = this;
            events().search(1, 1, _this.currentOffset, _this.perPage, '', function (response) {
                _this.totalCommits = response.total;
                let html = commitList().getHtml(response.data);
                $('.commit-list').html(html);
                _this.paginate();
            });
        },

        paginate: function () {
            const _this = this;
            pagination.generate(_this.totalCommits, _this.currentOffset, _this.perPage, function (offset) {
                _this.currentOffset = offset;
                _this.load();
            });
        }
    };
};