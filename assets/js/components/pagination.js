'use strict';

import $ from 'jquery';

export default {

    $paginationContainers: $('.js-pagination'),

    generate: function(total, offset, limit, callback) {
        let numberOfPages = parseInt(total / limit);
        if (total % limit > 0) numberOfPages++;
        let currentPage = offset == 0 ? 1 : parseInt(offset / limit);
        if (offset % limit == 0 && offset > 0) currentPage++;

        let plusPage = currentPage + 1;
        if (plusPage > numberOfPages) plusPage = numberOfPages;
        let minusPage = currentPage - 1;
        if (minusPage < 1) minusPage = 1;

        let html = '<li><a href="#" data-page="' + minusPage + '"><i class="fa fa-angle-left"></i></a>';
        for (let i = 1; i<=numberOfPages; i++) {
            html += '<li';
            html += (currentPage == i) ? ' class="active"' : '';
            html += '><a href="#" data-page="' + i + '">' + i + '</a></li>';
        }
        html += '<li><a href="#" data-page="' + plusPage + '"><i class="fa fa-angle-right"></i></a>';

        this.$paginationContainers.html(html);
        this.setupClicks(limit, callback);
    },

    setupClicks: function(limit, callback) {
        const _this = this;
        _this.$paginationContainers.find('li > a').off('click').on('click', function(e) {
            e.preventDefault();
            _this.$paginationContainers.find('li').removeClass('active');
            $(this).parents('li').addClass('active');
            let pageNumber = $(this).data('page');
            if (pageNumber) callback((pageNumber - 1) * limit);
        });
    }
}