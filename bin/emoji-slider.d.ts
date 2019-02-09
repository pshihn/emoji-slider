import { LitElement, TemplateResult } from 'lit-element';
export declare class EmojiSlider extends LitElement {
    emoji?: string;
    private trackBar?;
    private cursor?;
    private pctValue;
    private dragging;
    private upHandler;
    private downHandler;
    private trackHandler;
    static styles: import("lit-element").CSSResult;
    render(): TemplateResult;
    firstUpdated(): void;
    disconnectedCallback(): void;
    private attachTrackHandlers;
    private detachTrackHandlers;
    private onUp;
    private onDown;
    private onTrack;
    private trackStart;
    private trackEnd;
    private trackX;
    private setValue;
    private fireEvent;
    value: number;
    readonly isDragging: boolean;
    private updateValue;
}
