const fs = require('fs');
const path = require('path');
const UglifyJS = require('uglify-js');

const defaultPluginOptions = {
  clipboardJSVersion: '2.0.11',
  buttonClass: 'code-copy',
  successMessage: 'Copied!',
  failureMessage: 'Failed...',
};
const defaultRendererOptions = {
  iconifyUrl: 'https://api.iconify.design/mdi/content-copy.svg',
  iconStyle: 'width: 16px; height: 16px;',
  iconClass: '',
  iconTag: 'span',
  buttonClass: 'code-copy',
  buttonStyle: 'position: absolute; top: 7.5px; right: 6px; padding-top: 3px; cursor: pointer; outline: none; opacity: 0.8;',
  additionalButtonClass: '',
  title: 'Copy',
};

function renderCode(origRule, rendererOptions) {
  return (tokens, idx, options, env, self) => {
    const origRendered = origRule(tokens, idx, options, env, self);
    if (tokens[idx].tag !== 'code') {
      return origRendered;
    }
    if (!tokens[idx].info || tokens[idx].info === 'mermaid') {
      return origRendered;
    }
    if (tokens[idx].content.length === 0) {
      return origRendered;
    }
    return `
<div style="position: relative">
  ${origRendered.replace(/<code/, `<code id="code-${idx}"`)}
  <button class="${rendererOptions.buttonClass} ${rendererOptions.additionalButtonClass}"
    data-clipboard-target="#code-${idx}"
    style="${rendererOptions.buttonStyle}" title="${rendererOptions.title}">
    <${rendererOptions.iconTag} style="display:inline-block;background:url(${rendererOptions.iconifyUrl}) no-repeat center center / contain;${rendererOptions.iconStyle}" class="${rendererOptions.iconClass}"></${rendererOptions.iconTag}>
  </button>
</div>
`;
  };
}

async function initClipboardJS(options) {
  const originSource = (await fs.promises.readFile(path.join(__dirname, '/init-clipboard.js'))).toString();
  const script = originSource.replace('new ClipboardJS(\'\')', `new ClipboardJS('.${options.buttonClass}')`)
    .replace('Copied!', options.successMessage)
    .replace('Failed...', options.failureMessage);
  const minified = UglifyJS.minify(script);
  if (minified.error) {
    throw minified.error;
  }
  return `<script>${minified.code}</script>
<script async src="https://cdn.jsdelivr.net/npm/clipboard@${options.clipboardJSVersion}/dist/clipboard.min.js"></script>`;
}

module.exports = {
  configFunction(eleventyConfig, pluginOptions) {
    const pluginFallbackOptions = {
      ...defaultPluginOptions,
      ...pluginOptions,
    };
    eleventyConfig.addAsyncShortcode('initClipboardJS', async () => initClipboardJS(pluginFallbackOptions));
  },
  markdownItCopyButton(md, rendererOptions) {
    const rendererFallbackOptions = {
      ...defaultRendererOptions,
      ...rendererOptions,
    };
    md.renderer.rules.fence = renderCode(
      md.renderer.rules.fence,
      rendererFallbackOptions,
    );
  },
};
