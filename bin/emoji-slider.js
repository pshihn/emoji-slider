var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LitElement, html, css, property, customElement, query } from 'lit-element';
import { addListener, removeListener } from '@polymer/polymer/lib/utils/gestures';
let EmojiSlider = class EmojiSlider extends LitElement {
    constructor() {
        super(...arguments);
        this.pctValue = 0;
        this.dragging = false;
        this.upHandler = () => this.onUp();
        this.downHandler = (e) => this.onDown(e);
        this.trackHandler = (e) => this.onTrack(e);
    }
    render() {
        return html `
    <div id="bar">
      <div id="barLine"></div>
      <div id="cursor" class="${this.emoji ? 'emoji' : 'noemoji'}">
        <span>${this.emoji}</span>
      </div>
    </div>
    `;
    }
    firstUpdated() {
        this.attachTrackHandlers();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.detachTrackHandlers();
    }
    attachTrackHandlers() {
        this.detachTrackHandlers();
        const bar = this.trackBar;
        addListener(bar, 'up', this.upHandler);
        addListener(bar, 'down', this.downHandler);
        addListener(bar, 'track', this.trackHandler);
    }
    detachTrackHandlers() {
        const bar = this.trackBar;
        removeListener(bar, 'up', this.upHandler);
        removeListener(bar, 'down', this.downHandler);
        removeListener(bar, 'track', this.trackHandler);
    }
    onUp() {
        this.trackEnd();
    }
    onDown(e) {
        const event = e;
        event.preventDefault();
        this.setValue(event.detail.x);
        this.cursor.classList.add('active');
    }
    onTrack(e) {
        const event = e;
        event.stopPropagation();
        switch (event.detail.state) {
            case 'start':
                this.trackStart();
                break;
            case 'track':
                this.trackX(event);
                break;
            case 'end':
                this.trackEnd();
                break;
        }
    }
    trackStart() {
        this.dragging = true;
        this.cursor.classList.add('active');
    }
    trackEnd() {
        this.dragging = false;
        this.cursor.classList.remove('active');
    }
    trackX(event) {
        if (!this.dragging) {
            this.trackStart();
        }
        this.setValue(event.detail.x);
    }
    setValue(x) {
        const rect = this.trackBar.getBoundingClientRect();
        const pct = Math.max(0, Math.min(rect.width ? ((x - rect.left) / rect.width) : 0, 1));
        if (this.pctValue !== pct) {
            this.pctValue = pct;
            this.updateValue();
            this.fireEvent('change');
        }
    }
    fireEvent(name) {
        this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true, detail: { value: this.value } }));
    }
    set value(v) {
        this.pctValue = v;
        this.updateValue();
    }
    get value() {
        return this.pctValue;
    }
    get isDragging() {
        return this.dragging;
    }
    updateValue() {
        if (this.cursor)
            this.cursor.style.left = `${this.pctValue * 100}%`;
    }
};
EmojiSlider.styles = css `
    :host {
      display: block;
      position: relative;
    }
    #bar {
      position: relative;
      cursor: pointer;
      padding: 10px 0;
    }
    #barLine {
      background: var(--emoji-slider-bar-color, #e5e5e5);
      height: 4px;
    }
    #cursor {
      position: absolute;
      top: 4px;
      left: 0px;
      transform: translate3d(-8px, 0, 0);
      transition: transform 0.28s ease, box-shadow 0.28s ease;
    }
    #cursor.noemoji {
      background: var(--emoji-slider-cursor-color, #d32f2f);
      border-radius: 10px;
      width: 16px;
      height: 16px;
    }
    #cursor.noemoji span {
      display: none;
    }
    #cursor.emoji {
      background: none;
      width: auto;
      height: auto;
      font-size: var(--emoji-slider-font-size, 24px);
      line-height: 1.17;
      transform: translate3d(-8px, -0.25em, 0);
    }
    #cursor.active {
      transform: translate3d(-8px, 0, 0) scale(1.5);
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
    }
    #cursor.emoji.active {
      transform: translate3d(-8px, -0.25em, 0) scale(1.5);
      box-shadow: none;
    }
  `;
__decorate([
    property(),
    __metadata("design:type", String)
], EmojiSlider.prototype, "emoji", void 0);
__decorate([
    query('#bar'),
    __metadata("design:type", HTMLDivElement)
], EmojiSlider.prototype, "trackBar", void 0);
__decorate([
    query('#cursor'),
    __metadata("design:type", HTMLDivElement)
], EmojiSlider.prototype, "cursor", void 0);
EmojiSlider = __decorate([
    customElement('emoji-slider')
], EmojiSlider);
export { EmojiSlider };
