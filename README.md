# emoji-slider
A slider control which uses an emoji as the thumb.

This is built as a web component, so it's usable anywhere with HTML.

[View live demo.](https://pshihn.github.io/emoji-slider/demo/)

![Emoji Slider](https://i.imgur.com/RyyBB6B.png)

## Usage

Get the compoent

```
npm install --save emoji-slider
```

Import in a JavaScript module:

``` javascript
import 'emoji-slider';
```

Or in an HTML page:
```html
<script type="module" src="./node_module/emoji-slider/bin/emoji-slider.js"></script>
```

And then use it in HTML

```
<emoji-slider emoji="😍"></emoji-slider>
```

More about using web components [here](https://lit-element.polymer-project.org/guide/use).

## Properties

**value:** The numeric value of the slider between 0 and 1.

**emoji:** The emoji character to use in the thumb of the slider. If not set, a circular thumb is used.

**step:** The change in value when controlling the slider with keyboard e.g., *Right Arrow Key* will increate the value by 0.1. Default value of *step* is 0.1

## Events
**change** event is fired as the slider value changes. the current value can be obtained from the event details: `event.detail.value`

## Styling
The following elements can be modified:

```css
emoji-slider {
  --emoji-slider-barLine-color: #e5e5e5;
  --emoji-slider-barLine-height: 4px;
  --emoji-slider-barLine-border-radius: 5px;
  --emoji-slider-valueBar-active-color: #2196f3;
  --emoji-slider-cursor-color: #d32f2f;
  --emoji-slider-cursor-width: 16px;
  --emoji-slider-cursor-height: 16px;
  --emoji-slider-font-size: 24px;
}
```

## License
[MIT License](https://github.com/pshihn/emoji-slider/blob/master/LICENSE) (c) [Preet Shihn](https://twitter.com/preetster)
