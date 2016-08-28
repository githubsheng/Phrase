import {Phrase} from "../../js/models/Phrase";
import {FilterStatus} from "../../js/models/FilterStatus";

export function runStatusFilterTest() {

    describe('StatusFilter', function () {

        it('filter phrases by their status', function () {

            angular.mock.module('Main');

            let statusFilter = null;

            inject(function (_$filter_) {
                statusFilter = _$filter_('statusFilter');
            });

            let phrases:Phrase[] = [];
            for (let i = 0; i < 200; i++) {
                phrases.push({
                    id: i,
                    context: "",
                    value: "",
                    note: null,
                    status: FilterStatus.Visible,
                    selected: false
                });
            }

            phrases[3].status = FilterStatus.Hidden;
            phrases[5].status = FilterStatus.Hidden;
            phrases[10].status = FilterStatus.Hidden;

            expect(statusFilter(phrases, FilterStatus.Hidden).length).toBe(3);
            expect(statusFilter(phrases, FilterStatus.Visible).length).toBe(197);
            expect(statusFilter(phrases, FilterStatus.All).length).toBe(200);

        });
    });

}