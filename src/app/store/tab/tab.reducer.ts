import { Action, Store } from "ngrx-actions";

import { TabState } from "./tab.state";
import { CreateTabAction, RemoveTabAction, ChangeSelectedTabAction } from "./tab.actions";

import { Tab } from "../../models/tab.model";

const initialState: TabState = {
    tabs: [new Tab(0)],
    selectedTabId: 0
};

@Store(initialState)
export class TabStore {
    @Action(CreateTabAction)
    public createTab(state: TabState, { tab }: CreateTabAction) {
        return { ...state, tabs: [...state.tabs, tab] };
    }

    @Action(RemoveTabAction)
    public removeTab(state: TabState, { id }: RemoveTabAction) {
        const tabs = state.tabs.filter(tab => tab.id !== id);
        return { ...state, tabs };
    }

    @Action(ChangeSelectedTabAction)
    public changeSelectedTab(state: TabState, { id }: ChangeSelectedTabAction) {
        return { ...state, selectedTabId: id }
    }
}
