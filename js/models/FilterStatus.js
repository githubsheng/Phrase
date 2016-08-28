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
