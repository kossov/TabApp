import { Component } from "@angular/core";

import { Observable } from "rxjs";

import { Tab } from "../../models/tab.model";
import { AbstractIdProvider, IdProviderService } from "../../services/id-provider.service";
import { Dispatcher } from "../../store/app.state";
import { TabSelectors } from "../../store/tab/tab.selectors";
import { ChangeSelectedTabAction, RemoveTabAction, CreateTabAction } from "../../store/tab/tab.actions";

@Component({
    selector: "tabs-container",
    templateUrl: "tabs.component.html",
    styleUrls: ["tabs.component.css"],
    providers: [
        {
            provide: AbstractIdProvider,
            useClass: IdProviderService
        }
    ]
})
export class TabsComponent {
    public tabs$: Observable<Tab[]>;
    public selectedTabId$: Observable<number>;

    constructor(
        private idProvider: AbstractIdProvider,
        private dispatcher: Dispatcher,
        tabSelectors: TabSelectors) {
        this.tabs$ = tabSelectors.tabs$;
        this.selectedTabId$ = tabSelectors.selectedTabId$;
    }

    public onTabChange(tab: Tab) {
        this.dispatcher.dispatch(new ChangeSelectedTabAction(tab.id));
    }

    public onRemoveTab(id: number) {
        this.dispatcher.dispatch(new RemoveTabAction(id));
        // TODO: Refactor magic value
        this.dispatcher.dispatch(new ChangeSelectedTabAction(id - 1));
    }

    public onCreateTab() {
        const tab = new Tab(this.idProvider.getId());
        this.dispatcher.dispatch(new CreateTabAction(tab));
        this.dispatcher.dispatch(new ChangeSelectedTabAction(tab.id));
    }
}
