/**
 * Created by wangsheng on 28/8/16.
 */
/// <reference path="../typings/tsd.d.ts"/>

import {StatusFilter} from "../js/filters/StatusFilter";
import {ToolTipDirective} from "../js/directive/ToolTipDirective";
import {InfiniteScrollServiceFactory} from "../js/services/InfiniteScrollService";
import {FakeAjaxServiceFactory} from "../js/services/FakeAjaxService";
import {PhrasesController} from "../js/controllers/PhrasesController";
import {runPhraseControllerTest} from "./controllers/PhrasesControllerTest";
import {runStatusFilterTest} from "./filters/StatusFilterTest";

angular.module('Main', ["ngSanitize"])
    .filter('unsafe', ["$sce", function($sce) { return $sce.trustAsHtml;}])
    .filter('statusFilter', StatusFilter)
    .directive('wsToolTip', ToolTipDirective)
    .factory('infiniteScrollService', InfiniteScrollServiceFactory)
    .factory('fakeAjaxToServer', ["$q", FakeAjaxServiceFactory])
    .controller("phrasesController", ["$scope", '$filter', 'infiniteScrollService', 'fakeAjaxToServer', PhrasesController]);

runPhraseControllerTest();
runStatusFilterTest();
