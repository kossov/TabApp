import { Content } from "../../models/content.model";

export class ContentPresenterState {
    public readonly data: { [key: number]: { content: Content, scrollPosition?: number } };
}