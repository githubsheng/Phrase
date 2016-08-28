/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by wangsheng on 28/8/16.
	 */
	/// <reference path="../typings/tsd.d.ts"/>
	"use strict";
	const StatusFilter_1 = __webpack_require__(1);
	const ToolTipDirective_1 = __webpack_require__(3);
	const InfiniteScrollService_1 = __webpack_require__(4);
	const FakeAjaxService_1 = __webpack_require__(5);
	const PhrasesController_1 = __webpack_require__(6);
	const PhrasesControllerTest_1 = __webpack_require__(7);
	const StatusFilterTest_1 = __webpack_require__(8);
	angular.module('Main', ["ngSanitize"])
	    .filter('unsafe', ["$sce", function ($sce) { return $sce.trustAsHtml; }])
	    .filter('statusFilter', StatusFilter_1.StatusFilter)
	    .directive('wsToolTip', ToolTipDirective_1.ToolTipDirective)
	    .factory('infiniteScrollService', InfiniteScrollService_1.InfiniteScrollServiceFactory)
	    .factory('fakeAjaxToServer', FakeAjaxService_1.FakeAjaxServiceFactory)
	    .controller("phrasesController", ["$scope", '$filter', 'infiniteScrollService', 'fakeAjaxToServer', PhrasesController_1.PhrasesController]);
	PhrasesControllerTest_1.runPhraseControllerTest();
	StatusFilterTest_1.runStatusFilterTest();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const FilterStatus_1 = __webpack_require__(2);
	function StatusFilter() {
	    return function (phrases, status) {
	        return status === FilterStatus_1.FilterStatus.All ? phrases : phrases.filter((p) => p.status === status);
	    };
	}
	exports.StatusFilter = StatusFilter;


/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Created by wangsheng on 27/8/16.
	 */
	"use strict";
	(function (FilterStatus) {
	    FilterStatus[FilterStatus["Visible"] = 0] = "Visible";
	    FilterStatus[FilterStatus["Hidden"] = 1] = "Hidden";
	    FilterStatus[FilterStatus["All"] = 2] = "All";
	})(exports.FilterStatus || (exports.FilterStatus = {}));
	var FilterStatus = exports.FilterStatus;


/***/ },
/* 3 */
/***/ function(module, exports) {

	/**
	 * Created by wangsheng on 28/8/16.
	 */
	"use strict";
	function ToolTipDirective() {
	    let tooltipContainer = document.getElementById("tooltipContainer");
	    let tooltipInner = tooltipContainer.querySelector(".tooltip-inner");
	    return {
	        restrict: 'A',
	        link: function postLink(scope, element, attributes) {
	            element.on('mouseover', function () {
	                let ebbox = element[0].getBoundingClientRect();
	                let eTop = ebbox.top;
	                let eWidthCenter = ebbox.left + ebbox.width / 2;
	                tooltipInner.textContent = attributes['wsToolTip'];
	                tooltipContainer.style.top = eTop;
	                tooltipContainer.style.left = eWidthCenter;
	                tooltipContainer.style.transform = "translate(-50%, -100%)";
	                tooltipContainer.style.display = "block";
	            });
	            element.on("mouseout", function () {
	                tooltipContainer.style.display = "none";
	            });
	        },
	    };
	}
	exports.ToolTipDirective = ToolTipDirective;


/***/ },
/* 4 */
/***/ function(module, exports) {

	/**
	 * Created by wangsheng on 28/8/16.
	 */
	"use strict";
	function InfiniteScrollServiceFactory() {
	    let _action = null;
	    let _container = null;
	    window.onscroll = function () {
	        if (_action && _container && (_container.clientHeight - window.pageYOffset < 2 * window.innerHeight))
	            _action();
	    };
	    function init(container, action) {
	        _container = container;
	        _action = action;
	    }
	    return {
	        init: init
	    };
	}
	exports.InfiniteScrollServiceFactory = InfiniteScrollServiceFactory;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const FilterStatus_1 = __webpack_require__(2);
	function FakeAjaxServiceFactory() {
	    function generateRandomPhrases() {
	        let contextWords = ['scala', 'typescript', 'groovy', 'java', 'javascript', 'go-lang', 'python', 'shader lang'];
	        let valueWords = ['spring', 'nodejs', 'play', 'redis', 'mongodb', 'mysql', 'memcache', 'jetty', 'tomcat', 'guava', 'webgl', 'canvas', 'indexdb'];
	        let phrases = [];
	        for (let i = 0; i < 200; i++) {
	            let contextWordsIndex = i % contextWords.length;
	            let valueWordsIndex = i % contextWords.length;
	            phrases.push({
	                id: i,
	                context: [contextWords[contextWordsIndex++], contextWords[contextWordsIndex++], contextWords[contextWordsIndex++]].join(" "),
	                value: [valueWords[valueWordsIndex++], valueWords[valueWordsIndex++], valueWords[valueWordsIndex++]].join(" "),
	                note: null,
	                status: FilterStatus_1.FilterStatus.Visible,
	                selected: false
	            });
	        }
	        return phrases;
	    }
	    return function getPhrasesFromHTTPServer() {
	        function promiseFunc(resolve) {
	            setTimeout(() => {
	                resolve(generateRandomPhrases());
	            }, 100);
	        }
	        return new Promise(promiseFunc);
	    };
	}
	exports.FakeAjaxServiceFactory = FakeAjaxServiceFactory;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const FilterStatus_1 = __webpack_require__(2);
	const StatusFilter_1 = __webpack_require__(1);
	function PhrasesController($scope, $ngFilterService, infiniteScrollService, getPhrasesFromFakeServer) {
	    /**
	     * convenient properties set on $scope so that I can references the `FilterStatus` enums in angular expressions.
	     */
	    $scope.VISIBLE_FILTER_STATE = FilterStatus_1.FilterStatus.Visible;
	    $scope.HIDDEN_FILTER_STATE = FilterStatus_1.FilterStatus.Hidden;
	    $scope.ALL_FILTER_STATE = FilterStatus_1.FilterStatus.All;
	    /**
	     * used to set the `option` in a `select` tag. The `select` tag is used to set `$scope.currentFilterState`.
	     * `$scope.currentFilterState` is later used to filter phrases by their status (hidden/visible).
	     */
	    $scope.currentFilterState = FilterStatus_1.FilterStatus.All;
	    $scope.filterStatesAsOptions = [{ status: FilterStatus_1.FilterStatus.Visible, label: "visible" }, { status: FilterStatus_1.FilterStatus.Hidden, label: "hidden" }, { status: FilterStatus_1.FilterStatus.All, label: "all" }];
	    /**
	     * select a single phrase. This sets the `selected` property of a phrase to true.
	     * @param phrase
	     */
	    const setSelected = (phrase) => phrase.selected = true;
	    /**
	     * select all phrases filtered by `$scope.currentFilterState` and `$scope.filterKeyWord`, and also update.
	     * `$scope.numberOfSelectedPhrases`. From user perspective, they can filter phrases by status or keywords first,
	     * and then select all the filtered results.
	     */
	    const selectAllPhrases = function () {
	        let ret = StatusFilter_1.StatusFilter()($scope.phrases, $scope.currentFilterState);
	        ret = $ngFilterService('filter')(ret, $scope.filterKeyWord);
	        ret.forEach(setSelected);
	        $scope.numberOfSelectedPhrases = ret.length;
	    };
	    /**
	     * unselect a single phrase. This sets the `selected` property of a phrase to false.
	     * @param phrase
	     */
	    const setUnselected = (phrase) => phrase.selected = false;
	    /**
	     * unselect all phrases. see `selectAllPhrases` for more information.
	     */
	    const unselectAllPhrases = () => {
	        $scope.phrases.forEach(setUnselected);
	        $scope.numberOfSelectedPhrases = 0;
	    };
	    /**
	     * toggle select-all
	     */
	    $scope.isSelectAll = false;
	    $scope.toggleAllSelection = () => $scope.isSelectAll ? selectAllPhrases() : unselectAllPhrases();
	    /**
	     * returns a function which is used in `Array.prototype.reduce`. This function accumulates the count / result
	     * returned by `cb` function.
	     * @param cb a function that takes a phrase and returns a number.
	     */
	    const accCount = (cb) => (acc, phrase) => acc + cb(phrase);
	    /**
	     * checks whether a phrase's status is hidden, if so, returns 1, otherwise 0.
	     * @param phrase
	     */
	    const checkHidden = (phrase) => phrase.status === FilterStatus_1.FilterStatus.Hidden ? 1 : 0;
	    /**
	     * counts the number of phrases whose status are hidden.
	     * @param phrases an array of phrases.
	     */
	    const _countHiddenPhrases = (phrases) => phrases.reduce(accCount(checkHidden), 0);
	    /**
	     * count the number of phrases whose status are hidden, and update `$scope.numberOfHiddenPhrases`.
	     */
	    $scope.countHiddenPhrases = () => $scope.numberOfHiddenPhrases = _countHiddenPhrases($scope.phrases);
	    /**
	     * similar to `checkHidden`, `_countHiddenPhrases`, and `countHiddenPhrases`. Except that we check / count
	     * selected phrases, rather than hidden phrases.
	     */
	    const checkSelected = (phrase) => phrase.selected ? 1 : 0;
	    const _countSelectedPhrases = (phrases) => phrases.reduce(accCount(checkSelected), 0);
	    $scope.countSelectedPhrases = () => $scope.numberOfSelectedPhrases = _countSelectedPhrases($scope.phrases);
	    $scope.phrases = [];
	    /**
	     * retrieves phrases from server via ajax. then load note from localstorage and link the notes to
	     * the phrases.
	     */
	    const getNoteFromLocalStorage = (phrase) => phrase.note = window.localStorage.getItem(phrase.id);
	    getPhrasesFromFakeServer().then((phrases => {
	        phrases.forEach(getNoteFromLocalStorage);
	        $scope.$apply(function () {
	            $scope.phrases = phrases;
	            $scope.numberOfHiddenPhrases = _countHiddenPhrases($scope.phrases);
	        });
	    }));
	    /**
	     * hide all selected phrases
	     */
	    $scope.hideSelectedPhrases = function () {
	        $scope.phrases.filter(p => p.selected).forEach(p => p.status = FilterStatus_1.FilterStatus.Hidden);
	        $scope.countHiddenPhrases();
	    };
	    /**
	     * show all selected phrases
	     */
	    $scope.showSelectedPhrases = function () {
	        $scope.phrases.filter(p => p.selected).forEach(p => p.status = FilterStatus_1.FilterStatus.Visible);
	        $scope.countHiddenPhrases();
	    };
	    //a global mutable state in this project. not very pure functional, but I cannot seem to find a better solution for now.
	    let phraseInEdit = null;
	    /**
	     * starting to add notes to a phrase
	     * @param phrase
	     */
	    $scope.addNote = function (phrase) {
	        $scope.isModalShown = true;
	        phraseInEdit = phrase;
	        $scope.notesInEdit = phrase.note;
	    };
	    /**
	     * link the note to the phrase and saves the note in `localstorage`.
	     */
	    $scope.saveNote = function () {
	        $scope.isModalShown = false;
	        phraseInEdit.note = $scope.notesInEdit;
	        window.localStorage.setItem(phraseInEdit.id.toString(), phraseInEdit.note);
	    };
	    const InitNumberOfDisplayedPhrases = 40;
	    $scope.numberOfDisplayedPhrases = InitNumberOfDisplayedPhrases;
	    $scope.resetNumberOfDisplayedPhrases = () => $scope.numberOfDisplayedPhrases = InitNumberOfDisplayedPhrases;
	    const increaseNumberOfDisplayedPhrases = function () {
	        $scope.$apply(() => $scope.numberOfDisplayedPhrases += 40);
	    };
	    infiniteScrollService.init(document.getElementById("main-container"), increaseNumberOfDisplayedPhrases);
	}
	exports.PhrasesController = PhrasesController;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const FilterStatus_1 = __webpack_require__(2);
	function runPhraseControllerTest() {
	    describe("PhrasesController", function () {
	        const MAX_TIME_BEFORE_AJAX_TIMEOUT = 200;
	        let $controller;
	        let $rootScope;
	        let $scope;
	        angular.mock.module.sharedInjector();
	        beforeAll(angular.mock.module('Main'));
	        beforeAll(inject(function (_$controller_, _$rootScope_) {
	            $controller = _$controller_;
	            $rootScope = _$rootScope_;
	            $scope = $rootScope.$new();
	            $controller('phrasesController', { $scope: $scope });
	        }));
	        beforeAll(function (done) {
	            //wait for a while for the controller to fetch the phrases via ajax from server.
	            setTimeout(function () {
	                done();
	            }, MAX_TIME_BEFORE_AJAX_TIMEOUT);
	        });
	        function setSelected() {
	            $scope.phrases[1].selected = true;
	            $scope.phrases[2].selected = true;
	            $scope.phrases[4].selected = true;
	        }
	        function unsetSelected() {
	            getSelected().forEach((p) => p.selected = false);
	        }
	        function getSelected() {
	            return [$scope.phrases[1], $scope.phrases[2], $scope.phrases[4]];
	        }
	        it('count selected phrase', function () {
	            expect($scope.phrases.length).not.toBe(0);
	            //by default, all phrases are not selected, now I manually select 3 of them.
	            setSelected();
	            //it should count to 3
	            $scope.countSelectedPhrases();
	            expect($scope.numberOfSelectedPhrases).toBe(3);
	            unsetSelected();
	        });
	        it('count hidden phrases', function () {
	            expect($scope.phrases.length).not.toBe(0);
	            //by default, all phrases are visible, now I manually hide 3 of them.
	            $scope.phrases[1].status = FilterStatus_1.FilterStatus.Hidden;
	            $scope.phrases[2].status = FilterStatus_1.FilterStatus.Hidden;
	            $scope.phrases[4].status = FilterStatus_1.FilterStatus.Hidden;
	            //it should count to 3
	            $scope.countHiddenPhrases();
	            expect($scope.numberOfHiddenPhrases).toBe(3);
	        });
	        it('hide selected phrases', function () {
	            setSelected();
	            $scope.hideSelectedPhrases();
	            expect($scope.numberOfHiddenPhrases).toBe(3);
	            getSelected().forEach((p) => {
	                expect(p.status).toBe(FilterStatus_1.FilterStatus.Hidden);
	            });
	            unsetSelected();
	        });
	        it('show selected phrases', function () {
	            setSelected();
	            $scope.showSelectedPhrases();
	            expect($scope.numberOfHiddenPhrases).toBe(0);
	            getSelected().forEach((p) => {
	                expect(p.status).toBe(FilterStatus_1.FilterStatus.Visible);
	            });
	            unsetSelected();
	        });
	        it('only select all phrases filtered by search key word and phrase status', function () {
	            $scope.phrases[10].context = "wang sheng";
	            $scope.phrases[20].value = "wang sheng";
	            $scope.phrases[30].value = "wang sheng";
	            $scope.phrases[10].status = FilterStatus_1.FilterStatus.Hidden;
	            $scope.phrases[20].status = FilterStatus_1.FilterStatus.Hidden;
	            $scope.phrases[30].status = FilterStatus_1.FilterStatus.Hidden;
	            $scope.filterKeyWord = "wang sheng";
	            $scope.currentFilterState = FilterStatus_1.FilterStatus.Hidden;
	            //now after keyword and status filtering, we should only see 3 phrases. `toggleAllSelection` should only select all these 3
	            $scope.isSelectAll = true;
	            $scope.toggleAllSelection();
	            expect($scope.numberOfSelectedPhrases).toBe(3);
	        });
	        //this test case depends on the previous test cases.
	        it('unselect all phrases', function () {
	            expect($scope.numberOfSelectedPhrases).not.toBe(0);
	            //set this value to false, so that toggleAllSelection will unselect all phrases.
	            $scope.isSelectAll = false;
	            $scope.toggleAllSelection();
	            expect($scope.numberOfSelectedPhrases).toBe(0);
	        });
	    });
	}
	exports.runPhraseControllerTest = runPhraseControllerTest;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const FilterStatus_1 = __webpack_require__(2);
	function runStatusFilterTest() {
	    describe('StatusFilter', function () {
	        it('filter phrases by their status', function () {
	            angular.mock.module('Main');
	            let statusFilter = null;
	            inject(function (_$filter_) {
	                statusFilter = _$filter_('statusFilter');
	            });
	            let phrases = [];
	            for (let i = 0; i < 200; i++) {
	                phrases.push({
	                    id: i,
	                    context: "",
	                    value: "",
	                    note: null,
	                    status: FilterStatus_1.FilterStatus.Visible,
	                    selected: false
	                });
	            }
	            phrases[3].status = FilterStatus_1.FilterStatus.Hidden;
	            phrases[5].status = FilterStatus_1.FilterStatus.Hidden;
	            phrases[10].status = FilterStatus_1.FilterStatus.Hidden;
	            expect(statusFilter(phrases, FilterStatus_1.FilterStatus.Hidden).length).toBe(3);
	            expect(statusFilter(phrases, FilterStatus_1.FilterStatus.Visible).length).toBe(197);
	            expect(statusFilter(phrases, FilterStatus_1.FilterStatus.All).length).toBe(200);
	        });
	    });
	}
	exports.runStatusFilterTest = runStatusFilterTest;


/***/ }
/******/ ]);