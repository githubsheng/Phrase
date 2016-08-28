/**
 * Created by wangsheng on 28/8/16.
 */
/// <reference path="../typings/tsd.d.ts"/>
"use strict";
const StatusFilter_1 = require("../js/filters/StatusFilter");
const ToolTipDirective_1 = require("../js/directive/ToolTipDirective");
const InfiniteScrollService_1 = require("../js/services/InfiniteScrollService");
const FakeAjaxService_1 = require("../js/services/FakeAjaxService");
const PhrasesController_1 = require("../js/controllers/PhrasesController");
const PhrasesControllerTest_1 = require("./controllers/PhrasesControllerTest");
const StatusFilterTest_1 = require("./filters/StatusFilterTest");
angular.module('Main', ["ngSanitize"])
    .filter('unsafe', ["$sce", function ($sce) { return $sce.trustAsHtml; }])
    .filter('statusFilter', StatusFilter_1.StatusFilter)
    .directive('wsToolTip', ToolTipDirective_1.ToolTipDirective)
    .factory('infiniteScrollService', InfiniteScrollService_1.InfiniteScrollServiceFactory)
    .factory('fakeAjaxToServer', FakeAjaxService_1.FakeAjaxServiceFactory)
    .controller("phrasesController", ["$scope", '$filter', 'infiniteScrollService', 'fakeAjaxToServer', PhrasesController_1.PhrasesController]);
PhrasesControllerTest_1.runPhraseControllerTest();
StatusFilterTest_1.runStatusFilterTest();
