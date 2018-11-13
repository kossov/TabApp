import { Injectable } from "@angular/core";

export abstract class AbstractIdProvider {
    public abstract getId(): number;
}

@Injectable()
export class IdProviderService extends AbstractIdProvider {
    private currentId = 0;

    public getId(): number {
        return ++this.currentId;
    }
}
