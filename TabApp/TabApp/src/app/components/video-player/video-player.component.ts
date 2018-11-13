import { Component, Input } from "@angular/core";

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    templateUrl: "video-player.component.html",
    styleUrls: ["video-player.component.css"]
})
export class VideoPlayerComponent {
    @Input()
    public videoId: string;

    constructor(
        public sanitizer: DomSanitizer,
        public modal: NgbActiveModal) {
    }
}
