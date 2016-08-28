"use strict";
const FilterStatus_1 = require("../models/FilterStatus");
function StatusFilter() {
    return function (phrases, status) {
        return status === FilterStatus_1.FilterStatus.All ? phrases : phrases.filter((p) => p.status === status);
    };
}
exports.StatusFilter = StatusFilter;
