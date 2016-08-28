/**
 * Created by wangsheng on 27/8/16.
 */


import {FilterStatus} from "./FilterStatus";

export interface Phrase {
    id: number;
    context: string;
    value: string;
    status: FilterStatus;
    note: string;
    selected: boolean;
}