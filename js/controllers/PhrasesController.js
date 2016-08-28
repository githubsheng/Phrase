"use strict";
const FilterStatus_1 = require("../models/FilterStatus");
const StatusFilter_1 = require("../filters/StatusFilter");
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
