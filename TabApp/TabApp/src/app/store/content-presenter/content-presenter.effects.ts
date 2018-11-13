import { Injectable, Inject } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { ofAction } from "ngrx-actions";

import { tap, switchMap, catchError, withLatestFrom } from "rxjs/operators";
import { TabSelectors } from "../tab/tab.selectors";
import { SearchAction, SearchFailedAction, SaveDataAction, SearchSucceededAction } from "./content-presenter.actions";
import { AbstractDataService } from "../../services/data.service";
import { Content } from "../../models/content.model";
import { Item } from "src/app/models/item.model";

@Injectable()
export class ContentPresenterEffects {

    @Effect()
    public onDataFetch$ = this.actions$.pipe(
        ofAction(SearchAction),
        withLatestFrom(
            this.tabSelectors.selectedTabId$
        ),
        switchMap(([{ searchTerm }, _]) => this.dataService.search(searchTerm),
            ([{ searchTerm }, selectedTabId], data) => ({ searchTerm, selectedTabId, data })),
        switchMap(({ searchTerm, selectedTabId, data }) => [
            new SearchSucceededAction(),
            new SaveDataAction({
                id: selectedTabId,
                content: new Content(searchTerm, data.items.map(x => new Item(x.id, x.title, x.thumbnailUrl)))
            })]),
        catchError(error => [new SearchFailedAction(error)]));

    /** we only want to log the error and not pass an action after that */
    @Effect({ dispatch: false })
    public onFail$ = this.actions$.pipe(
        ofAction(SearchFailedAction),
        tap(((a: any) => {
            console.warn(a);
        }))
    );

    constructor(
        private actions$: Actions,
        private tabSelectors: TabSelectors,
        private dataService: AbstractDataService) { }
}
