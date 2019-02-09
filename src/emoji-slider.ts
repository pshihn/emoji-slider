import { LitElement, html, css, property, customElement, TemplateResult, query } from 'lit-element';
import { addListener, removeListener } from '@polymer/polymer/lib/utils/gestures';

@customElement('emoji-slider')
export class EmojiSlider extends LitElement {
  @property() emoji?: string;

  @query('#bar') private trackBar?: HTMLDivElement;
  @query('#cursor') private cursor?: HTMLDivElement;

  private pctValue = 0;
  private dragging = false;
  private upHandler = () => this.onUp();
  private downHandler = (e: Event) => this.onDown(e);
  private trackHandler = (e: Event) => this.onTrack(e);

  static styles = css`
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

  render(): TemplateResult {
    return html`
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

  private attachTrackHandlers() {
    this.detachTrackHandlers();
    const bar = this.trackBar!;
    addListener(bar, 'up', this.upHandler);
    addListener(bar, 'down', this.downHandler);
    addListener(bar, 'track', this.trackHandler);
  }

  private detachTrackHandlers() {
    const bar = this.trackBar!;
    removeListener(bar, 'up', this.upHandler);
    removeListener(bar, 'down', this.downHandler);
    removeListener(bar, 'track', this.trackHandler);
  }

  private onUp() {
    this.trackEnd();
  }

  private onDown(e: Event) {
    const event = e as CustomEvent;
    event.preventDefault();
    this.setValue(event.detail.x);
    this.cursor!.classList.add('active');
  }

  private onTrack(e: Event) {
    const event = e as CustomEvent;
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

  private trackStart() {
    this.dragging = true;
    this.cursor!.classList.add('active');
  }

  private trackEnd() {
    this.dragging = false;
    this.cursor!.classList.remove('active');
  }

  private trackX(event: CustomEvent) {
    if (!this.dragging) {
      this.trackStart();
    }
    this.setValue(event.detail.x);
  }

  private setValue(x: number) {
    const rect = this.trackBar!.getBoundingClientRect();
    const pct = Math.max(0, Math.min(rect.width ? ((x - rect.left) / rect.width) : 0, 1));
    if (this.pctValue !== pct) {
      this.pctValue = pct;
      this.updateValue();
      this.fireEvent('change');
    }
  }

  private fireEvent(name: string) {
    this.dispatchEvent(new CustomEvent(name, { bubbles: true, composed: true, detail: { value: this.value } }));
  }

  set value(v: number) {
    this.pctValue = v;
    this.updateValue();
  }

  get value(): number {
    return this.pctValue;
  }

  get isDragging(): boolean {
    return this.dragging;
  }

  private updateValue() {
    if (this.cursor) this.cursor.style.left = `${this.pctValue * 100}%`;
  }
}