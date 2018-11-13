import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, of } from "rxjs";
import { map, filter } from "rxjs/operators";

import { Item } from "../models/item.model";

export abstract class AbstractDataService {
    public abstract search(searchTerm: string): Observable<SearchResult>;
}

@Injectable()
export class YouTubeAPIDataService implements AbstractDataService {
    private readonly key = "AIzaSyDBT_yRDtSsnBGWYx9Aneb7vGJXDk_tcFc";
    private readonly baseUrl = "https://www.googleapis.com/youtube/v3/search";

    constructor(private http: HttpClient) {
    }

    public search(searchTerm: string, maxResults = 20): Observable<SearchResult> {
        const url = `${this.baseUrl}?key=${this.key}&part=snippet&maxResults=${maxResults}`;
        return this.http.get<SearchResult>(`${url}&q=${searchTerm}`).pipe(
            filter(x => !!x),
            map(this.flattenResponse)
        );
    }

    private flattenResponse(obj: any): SearchResult {
        const nextPageToken = obj["nextPageToken"];
        const items: Item[] = obj["items"]
            .filter(x => x["id"]["kind"] === "youtube#video")
            .map(x => ({
                id: x["id"]["videoId"],
                title: x["snippet"]["title"],
                thumbnailUrl: x["snippet"]["thumbnails"]["medium"]["url"]
            }));
        return { nextPageToken, items };
    }
}

@Injectable()
export class YoutubeAPIDataServiceMock implements AbstractDataService {
    public search(searchTerm: string): Observable<SearchResult> {
        return of({
            items: [
                { thumbnailUrl: "https://dveri.bg/images/users/zlatina/2018/the-test-fun-for-friends-screenshot.jpg.png", title: "Test 1" },
                { thumbnailUrl: "https://insurancemarket.ng/images/thumbnails/649/220/detailed/3/26e178f.png", title: "Test 2" },
                { thumbnailUrl: "http://www.toptipsclub.com/Images/page-img/keep-calm-and-prepare-for-a-test.png", title: "Test 3" },
            ]
        } as any);
    }
}

export interface SearchResult {
    nextPageToken: string;
    items: Item[]
}