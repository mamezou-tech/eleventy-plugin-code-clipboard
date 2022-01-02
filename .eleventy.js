const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');

const defaultPluginOptions = {
  clipboardJSVersion: '2.0.8',
  buttonClass: 'code-copy'
}

const defaultRendererOptions = {
  iconStyle: 'font-size: 15px; opacity: 0.8;',
  iconClass: 'mdi mdi-content-copy',
  iconTag: 'span',
  buttonStyle: 'position: absolute; top: 7.5px; right: 6px; cursor: pointer; outline: none; opacity: 0.8;',
  additionalButtonClass: '',
  title: 'Copy',
};

function renderCode(origRule, pluginOptions, rendererOptions) {
  return (tokens, idx, options, env, self) => {
    const origRendered = origRule(tokens, idx, options, env, self);
    if (tokens[idx].tag === 'code' && !tokens[idx].info) {
      return origRendered
    }
    if (tokens[idx].content.length === 0) {
      return origRendered;
    }
    return `
<div style="position: relative">
  ${origRendered.replace(/<code /, `<code id="code-${idx}"`)}
  <button class="${pluginOptions.buttonClass} ${rendererOptions.additionalButtonClass}"
    data-clipboard-target="#code-${idx}"
    style="${rendererOptions.buttonStyle}" title="${rendererOptions.title}">
    <span>
      <${rendererOptions.iconTag} style="${rendererOptions.iconStyle}" class="${rendererOptions.iconClass}"></${rendererOptions.iconTag}>
    </span>
  </button>
</div>
`;
  };
}

function initClipboardJS(options) {
  const originSource = fs.readFileSync(path.join(__dirname, '/init-clipboard.js')).toString();
  const script = originSource.replace('new ClipboardJS("")', `new ClipboardJS(".${options.buttonClass}")`);
  const minified = UglifyJS.minify(script);
  if (minified.error) {
    throw minified.error;
  }
  return `<script>${minified.code}</script>
<script src="https://cdn.jsdelivr.net/npm/clipboard@${options.clipboardJSVersion}/dist/clipboard.js"></script>`;
}

module.exports = {
  configFunction(eleventyConfig, pluginOptions) {
    const pluginFallbackOptions = {
      ...defaultPluginOptions,
      ...pluginOptions,
    };
    eleventyConfig.addShortcode('initClipboardJS', () => initClipboardJS(pluginFallbackOptions));
    this.markdownItCopyButton = (md, rendererOptions) => {
      const rendererFallbackOptions = {
        ...defaultRendererOptions,
        ...rendererOptions,
      }
      md.renderer.rules.fence = renderCode(md.renderer.rules.fence, pluginFallbackOptions, rendererFallbackOptions);
    }
  },
}
