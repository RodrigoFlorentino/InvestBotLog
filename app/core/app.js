(function () {
    'use strict';

    angular.module('app', [
        'ui.router',
        'app.index',
        'app.login',
        'app.chat',
        'app.user',
        'app.outros',
        'app.filtersC',
        'app.filtersT',
        'app.nav.header',
        'app.nav.menu',
        'app.modal',
        'app.directives.divSize',
        'app.authProvider'
    ]);
})();
