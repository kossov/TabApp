import { Action, Store } from "ngrx-actions";
import { ContentPresenterState } from "./content-presenter.state";
import { SaveDataAction, SaveScrollPositionAction } from "./content-presenter.actions";

const initialState: ContentPresenterState = {
    data: {},
};

@Store(initialState)
export class ContentPresenterStore {
    @Action(SaveDataAction)
    public saveData(state: ContentPresenterState, { payload }: SaveDataAction) {
        const id = payload.id;
        const content = payload.content;
        const data = { ...state.data, [id]: { content } };
        return { ...state, data };
    }

    @Action(SaveScrollPositionAction)
    public saveScroll(state: ContentPresenterState, { payload }: SaveScrollPositionAction) {
        const id = payload.id;
        const scrollPosition = payload.position;
        const dataObj = state.data[id];
        const data = { ...state.data, [id]: { ...dataObj, scrollPosition } }
        return { ...state, data };
    }
}
