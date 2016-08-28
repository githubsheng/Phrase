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
