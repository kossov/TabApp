import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AppStateModule } from "./store/app.state.module";
import { TabsComponent, ContentPresenterComponent } from "./components";
import { VideoPlayerComponent } from "./components/video-player/video-player.component";

import { AbstractDataService, YouTubeAPIDataService } from "./services/data.service";

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    ContentPresenterComponent,
    VideoPlayerComponent
  ],
  entryComponents: [VideoPlayerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppStateModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {
      provide: AbstractDataService,
      useClass: YouTubeAPIDataService
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
