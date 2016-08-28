/**
 * Created by wangsheng on 27/8/16.
 */

export enum FilterStatus {
    Visible, Hidden, All
}

export interface FilterStatusOption {
    status: FilterStatus;
    label: string;
}