import { Action } from "@ngrx/store";

import { Tab } from "../../models/tab.model";

export const CREATE_TAB = "[TAB] CREATE";
export const REMOVE_TAB = "[TAB] Remove";
export const CHANGE_SELECTED_TAB = "[TAB] CHANGE SELECTED ID";

export class CreateTabAction implements Action {
    readonly type = CREATE_TAB;

    constructor(public tab: Tab) { }
}

export class RemoveTabAction implements Action {
    readonly type = REMOVE_TAB;

    constructor(public id: number) { }
}

export class ChangeSelectedTabAction implements Action {
    readonly type = CHANGE_SELECTED_TAB;

    constructor(public id: number) { }
}
