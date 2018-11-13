import { Tab } from "src/app/models/tab.model";

export class TabState {
    public readonly tabs: Tab[];
    public readonly selectedTabId: number;
}
