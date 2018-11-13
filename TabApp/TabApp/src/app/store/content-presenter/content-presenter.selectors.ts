import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { mapDistinct } from "../helpers/map-distinct";
import { ContentPresenterState } from "./content-presenter.state";

@Injectable()
export class ContentPresenterSelectors {
    public data$ = mapDistinct(this.state$, x => x.data);

    constructor(private state$: Observable<ContentPresenterState>) { }
}
