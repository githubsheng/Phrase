/// <reference path="../typings/tsd.d.ts"/>

import {PhrasesController} from "./controllers/PhrasesController";
import {StatusFilter} from "./filters/StatusFilter";
import {FakeAjaxServiceFactory} from "./services/FakeAjaxService";
import {InfiniteScrollServiceFactory} from "./services/InfiniteScrollService";
import {ToolTipDirective} from "./directive/ToolTipDirective";

angular.module('Main', ["ngSanitize"])
    .filter('unsafe', ["$sce", function($sce) { return $sce.trustAsHtml;}])
    .filter('statusFilter', StatusFilter)
    .directive('wsToolTip', ToolTipDirective)
    .factory('infiniteScrollService', InfiniteScrollServiceFactory)
    .factory('fakeAjaxToServer', FakeAjaxServiceFactory)
    .controller("phrasesController", ["$scope", '$filter', 'infiniteScrollService', 'fakeAjaxToServer', PhrasesController]);