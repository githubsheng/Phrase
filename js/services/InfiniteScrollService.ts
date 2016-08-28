/**
 * Created by wangsheng on 28/8/16.
 */

export interface InfiniteScrollService {
    init(container: HTMLElement, action: Function): void;
}

export function InfiniteScrollServiceFactory(){

    let _action: Function = null;
    let _container: HTMLElement = null;

    window.onscroll = function(){
        if(_action && _container && (_container.clientHeight - window.pageYOffset < 2 * window.innerHeight))
            _action();
    };

    function init(container: HTMLElement, action: Function) {
        _container = container;
        _action = action;
    }

    return {
        init: init
    }

}