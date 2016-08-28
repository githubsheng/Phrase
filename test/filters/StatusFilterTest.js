"use strict";
const FilterStatus_1 = require("../../js/models/FilterStatus");
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
