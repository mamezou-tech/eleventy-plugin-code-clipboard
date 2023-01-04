# eleventy-code-clipboard

This plugin adds a clipboard copy button to code snippets blocks, while also allowing for custom icons/svgs.

This uses the [clipboard.js](https://www.npmjs.com/package/clipboard) library.
This plugin assumes use of the [eleventy-plugin-syntaxhighlight](https://github.com/11ty/eleventy-plugin-syntaxhighlight) plugin.

The clipboard button is by default the [Material Design Icons](https://materialdesignicons.com/) `content-copy` icon. You can change the icon by changing the `iconClass` attribute, or by changing the `renderMode` to either `svg-sprite` or `custom`.


## Setup

### initClipboardJS
The shortcode `{% initClipboardJS %}` should be placed in your file (I put it in my `article.njk` template since I want to enable copying code in my articles). Make sure you include this, as it is responsible for initializing `clipboard.js` on window.onload event.

[Warning: At the present moment, the tooltips are not working as intended by the original developer]

~~If clipboard copy succeeded, it shows a tooltips with message(default to `Copied!`).~~
~~Tooltips use [Primer Tooltips](https://primer.style/css/components/tooltips) CSS framework.~~

## Usage [Note: these are instructions for usage of the upstream original plugin (edited for clarity).]

### `.eleventy.js`
Add the following code to project's `.eleventy.js`.

- If you haven't already, install the eleventy-plugin-syntax-highlight to enable syntax highlighting.
```js
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {

  // markdown configuration
  
  eleventyConfig.addPlugin(syntaxHighlight);

  // others plugins, etc...
  
    
  return {
    // your settings
  }
}
```
#### Instructions for this custom code (scroll further for the plugin)
Instead of requiring an NPM package, you need to download the source code of this repository and put it in a folder next to your `.eleventy.js` file. 

```js
const codeClipboard = require("./config/code-clipboard/.eleventy");

module.exports = function (eleventyConfig) {
  // other stuff...
  
  eleventyConfig.addPlugin(codeClipboard);
  
  // others stuff...
  
  
  return {
    // your settings
  }
}
```

> If you are curious about the path above, the `./` signifies a local directory, and then the rest is the path to the .eleventy.js file of the code (you don't need to include the file extension of the .eleventy.js file).
For example, here is a file structure that you could use with that path.
```
config/
├─ code-clipboard/
│  ├─ .eleventy.js
│  ├─ init-clipboard.js
│  ├─ LICENSE
│  ├─ package.json
│  ├─ README.MD
_site/
src/
.eleventy.js
// your other files...
```

Scroll past the next section to continue reading about configuration.
#### The original plugin

```js
const codeClipboard = require("eleventy-plugin-code-clipboard");

module.exports = function (eleventyConfig) {
  // other stuff...
  
  eleventyConfig.addPlugin(codeClipboard);
  
  // others stuff...
  
  
  return {
    // your settings
  }
}
```

Add the MDI CSS to your CSS or HTML.

```css
@import url("https://cdn.jsdelivr.net/npm/@mdi/font@6.5.95/css/materialdesignicons.min.css");
```

or

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@6.5.95/css/materialdesignicons.min.css" crossorigin="anonymous" referrerpolicy="no-referrer"></link>
```
> The first link/import loads the MDI icon, so if you aren't using the default icon you don't need it. 
~~Also, since the tooltips aren't functioning at the moment, that is not necessary.~~ 
[The second stylesheet has since been removed.]

#### Both
As mentioned earlier, add the 11ty shortcode (`initClipboardJS`) to your template. This will generate the JavaScript that initializes clipboard.js and sets up the plugin.
For example, this might be how you put it in your template.
```html
<html>
  <head>...</head>
  <body>
    ...
    {% initClipboardJS %}
  </body>
</html>
```

## Default configuration options

- Plugin configuration
```js
eleventyConfig.addPlugin(codeClipboard, {
  // Version of clipboard.js to use. 
  clipboardJSVersion: '2.0.8',
  // CSS/HTML class of the copy button.
  buttonClass: 'code-copy',
});
```

- Markdown render options
```js
const markdownLibrary = markdownIt({
  html: true
}).use(codeClipboard.markdownItCopyButton, {
  // Style attributes of the button icon.
  iconStyle: 'font-size: 15px; opacity: 0.8;',
  // Class of the icon. If you are using something like FontAwesome, you might change this to `fa-regular fa-copy`.
  iconClass: 'mdi mdi-content-copy',
  // HTML tag of the icon. 'span' results in a <span> tag, 'i' results in an <i> tag, and so on. For something like FontAwesome, both should work.
  iconTag: 'span',
  // CSS/HTML class of the copy button.
  // This value should be the same as the plugin options above.
  buttonClass: 'code-copy',
  // Style attributes of the button itself.
  buttonStyle: 'position: absolute; top: 7.5px; right: 6px; cursor: pointer; outline: none; opacity: 0.8;',
  // Additional classes in addition to the one above. These can be different from the plugin options above.
  additionalButtonClass: '',
  // Value of the title attribute of the button. The title is displayed when the button is hovered over.
  title: 'Copy',
});
```

## Example

See [here](https://github.com/mamezou-tech/eleventy-plugin-code-clipboard/tree/main/example).
