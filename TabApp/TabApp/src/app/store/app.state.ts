import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import { TabState } from "./tab/tab.state";
import { ContentPresenterState } from "./content-presenter/content-presenter.state";

export class AppState {
    tabState: TabState;
    contentPresenterState: ContentPresenterState
}

@Injectable()
export class Dispatcher extends Store<AppState> { }
