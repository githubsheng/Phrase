/// <reference path="../typings/tsd.d.ts"/>
"use strict";
const PhrasesController_1 = require("./controllers/PhrasesController");
const StatusFilter_1 = require("./filters/StatusFilter");
const FakeAjaxService_1 = require("./services/FakeAjaxService");
const InfiniteScrollService_1 = require("./services/InfiniteScrollService");
const ToolTipDirective_1 = require("./directive/ToolTipDirective");
angular.module('Main', ["ngSanitize"])
    .filter('unsafe', ["$sce", function ($sce) { return $sce.trustAsHtml; }])
    .filter('statusFilter', StatusFilter_1.StatusFilter)
    .directive('wsToolTip', ToolTipDirective_1.ToolTipDirective)
    .factory('infiniteScrollService', InfiniteScrollService_1.InfiniteScrollServiceFactory)
    .factory('fakeAjaxToServer', FakeAjaxService_1.FakeAjaxServiceFactory)
    .controller("phrasesController", ["$scope", '$filter', 'infiniteScrollService', 'fakeAjaxToServer', PhrasesController_1.PhrasesController]);
