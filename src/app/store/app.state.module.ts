import { NgModule } from "@angular/core";

import { StoreModule, Store } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { NgrxActionsModule } from "ngrx-actions";

import { AppState, Dispatcher } from "./app.state";
import { TabSelectors } from "./tab/tab.selectors";
import { TabStore } from "./tab/tab.reducer";
import { ContentPresenterStore } from "./content-presenter/content-presenter.reducer";
import { ContentPresenterSelectors } from "./content-presenter/content-presenter.selectors";
import { ContentPresenterEffects } from "./content-presenter/content-presenter.effects";

@NgModule({
    imports: [
        StoreModule.forRoot({}),
        NgrxActionsModule.forRoot({ tabState: TabStore, contentPresenterState: ContentPresenterStore }),
        EffectsModule.forRoot([
            ContentPresenterEffects
        ])
    ],
    providers: [
        { provide: Dispatcher, useFactory: x => x, deps: [Store] },
        {
            provide: TabSelectors,
            useFactory:
                (store: Store<AppState>) => {
                    return new TabSelectors(store.select(x => x.tabState));
                },
            deps: [Store]
        },
        {
            provide: ContentPresenterSelectors,
            useFactory:
                (store: Store<AppState>) => {
                    return new ContentPresenterSelectors(store.select(x => x.contentPresenterState));
                },
            deps: [Store]
        }
    ]
})
export class AppStateModule { }
