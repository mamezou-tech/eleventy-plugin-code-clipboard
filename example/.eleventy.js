const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const codeClipboard = require('eleventy-plugin-code-clipboard');
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(codeClipboard);

  eleventyConfig.addPassthroughCopy('./src/css');

  /* Markdown Overrides */
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
  }).use(markdownItAttrs)
    .use(codeClipboard.markdownItCopyButton);

  eleventyConfig.setLibrary('md', markdownLibrary);

  return {
    passthroughFileCopy: true,
    dir: {
      input: 'src',
    },
  };
};
