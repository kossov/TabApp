import { Component, HostListener } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { Subject, Observable, BehaviorSubject } from "rxjs";
import { combineLatest, map, tap, debounceTime, takeUntil, withLatestFrom, distinctUntilChanged } from "rxjs/operators";

import { Dispatcher } from "../../store/app.state";
import { SearchAction, SaveScrollPositionAction } from "../../store/content-presenter/content-presenter.actions";
import { ContentPresenterSelectors } from "../../store/content-presenter/content-presenter.selectors";
import { TabSelectors } from "../../store/tab/tab.selectors";

import { VideoPlayerComponent } from "../video-player/video-player.component";

import { Item } from "../../models/item.model";

@Component({
    selector: "content-presenter",
    templateUrl: "./content-presenter.component.html",
    styleUrls: ["./content-presenter.component.css"]
})
export class ContentPresenterComponent {
    private destroy$ = new Subject<any>();
    private scrollY$ = new Subject<number>();
    private savedScrollPosition$ = new BehaviorSubject(null);

    public searchTerm: string;
    public items$: Observable<Item[]>;


    constructor(
        private dispatcher: Dispatcher,
        private tabSelectors: TabSelectors,
        contentPresenterSelectors: ContentPresenterSelectors,
        private modalService: NgbModal
    ) {
        const content$ = this.tabSelectors.selectedTabId$.pipe(
            combineLatest(contentPresenterSelectors.data$),
            map(([id, data]) => data[id] && data[id].content),
            distinctUntilChanged()
        );
        const scrollPosition$ = this.tabSelectors.selectedTabId$.pipe(
            combineLatest(contentPresenterSelectors.data$),
            map(([id, data]) => data[id] && data[id].scrollPosition),
            distinctUntilChanged()
        );
        this.items$ = this.tabSelectors.selectedTabId$.pipe(
            combineLatest(content$),
            withLatestFrom(scrollPosition$),
            debounceTime(1),
            map(([[_, content], scrollPosition]) => {
                this.savedScrollPosition$.next(scrollPosition);
                this.searchTerm = content ? content.searchTerm : null;
                return content ? content.items : [];
            })
        );

        // save scroll position for current tab
        this.scrollY$.pipe(
            debounceTime(300),
            withLatestFrom(tabSelectors.selectedTabId$),
            tap(([scrollY, selectedTabId]) => {
                this.dispatcher.dispatch(new SaveScrollPositionAction({ id: selectedTabId, position: scrollY }));
            }),
            takeUntil(this.destroy$)
        ).subscribe();
    }

    @HostListener('window:scroll')
    private onScroll() {
        this.scrollY$.next(scrollY);
    }

    private ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private ngAfterViewChecked() {
        this.restoreScroll();
    }

    private restoreScroll() {
        const scrollPosition = this.savedScrollPosition$.getValue();
        if (scrollPosition != null) {
            scrollTo(0, scrollPosition);
            // already scrolled to it
            this.savedScrollPosition$.next(null);
        }
    }

    public onSearch() {
        this.dispatcher.dispatch(new SearchAction(this.searchTerm));
    }

    public onPlayVideo(itemId: string) {
        const modalRef = this.modalService.open(VideoPlayerComponent, { centered: true, size: "lg" });
        (modalRef.componentInstance as VideoPlayerComponent).videoId = itemId;
    }
}
