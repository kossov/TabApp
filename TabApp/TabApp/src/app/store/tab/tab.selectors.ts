import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { mapDistinct } from "../helpers/map-distinct";
import { TabState } from "./tab.state";


@Injectable()
export class TabSelectors {
    public tabs$ = mapDistinct(this.state$, x => x.tabs);

    /**
     * if there is no such tab with the associated id, will return the last tab id
     */
    public selectedTabId$ = this.state$.pipe(
        map(x => x.tabs && x.tabs[x.selectedTabId] ? x.selectedTabId : x.tabs[x.tabs.length - 1].id)
    );

    constructor(private state$: Observable<TabState>) { }
}
