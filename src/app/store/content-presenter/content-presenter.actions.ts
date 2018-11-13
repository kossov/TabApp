import { Action } from "@ngrx/store";
import { Content } from "../../models/content.model";

export const SEARCH = "[CONTENT_PRESENTER] SEARCH";
export const SEARCH_SUCCEEDED = "[CONTENT_PRESENTER] SEARCH SUCCEEDED";
export const SEARCH_FAILED = "[CONTENT_PRESENTER] SEARCH FAILED";
export const SAVE_DATA = "[CONTENT_PRESENTER] LOAD DATA";
export const SAVE_SCROLL_POSITION = "[CONTENT_PRESENTER] SAVE SCROLL POSITION";

export class SearchAction implements Action {
    readonly type = SEARCH;

    constructor(public searchTerm: string) { }
}

export class SearchSucceededAction implements Action {
    readonly type = SEARCH_SUCCEEDED;
}

export class SearchFailedAction implements Action {
    readonly type = SEARCH_FAILED;

    constructor(public payload: any) { }
}

export class SaveDataAction implements Action {
    readonly type = SAVE_DATA;

    constructor(public payload: { id: number, content: Content }) { }
}

export class SaveScrollPositionAction implements Action {
    readonly type = SAVE_SCROLL_POSITION;

    constructor(public payload: { id: number, position: number }) { }
}