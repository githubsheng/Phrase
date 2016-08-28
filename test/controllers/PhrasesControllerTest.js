"use strict";
const FilterStatus_1 = require("../../js/models/FilterStatus");
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
