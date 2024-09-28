const plugin = require('..');

const mockAddShortcode = jest.fn();
const eleventyConfig = { addAsyncShortcode: mockAddShortcode };

describe('clipboard.js initialization', () => {
  afterEach(() => {
    mockAddShortcode.mockClear();
  });

  test('default plugin config', async () => {
    plugin.configFunction(eleventyConfig);
    expect(mockAddShortcode).toHaveBeenCalledTimes(1);
    const onloadScript = await mockAddShortcode.mock.calls[0][1]();
    expect(onloadScript).toMatchSnapshot();
  });

  test('custom plugin config', async () => {
    plugin.configFunction(eleventyConfig, {
      clipboardJSVersion: '2.0.0',
      buttonClass: 'test-button',
      successMessage: 'Success!!',
      failureMessage: 'Failure!!',
    });
    expect(mockAddShortcode).toHaveBeenCalledTimes(1);
    const onloadScript = await mockAddShortcode.mock.calls[0][1]();
    expect(onloadScript).toMatchSnapshot();
  });
});

describe('custom renderer', () => {
  let md;
  const mockRenderAttrs = jest.fn().mockReturnValue('class="test"');

  beforeEach(() => {
    md = {
      renderer: {
        rules: {
          fence: () => '<pre class="language-yaml"><code>test: unit-test<br />type: 11ty</code></pre>',
        },
      },
    };
  });

  afterEach(() => {
    mockRenderAttrs.mockClear();
  });

  test('default renderer config', () => {
    plugin.configFunction(eleventyConfig);
    plugin.markdownItCopyButton(md);
    const token = { tag: 'code', info: 'yaml', content: 'test: unit-test\ntype: 11ty' };
    const html = md.renderer.rules.fence(
      [token],
      0,
      undefined,
      undefined,
      { renderAttrs: mockRenderAttrs },
    );
    expect(html).toMatchSnapshot();
  });

  test('custom renderer config', () => {
    plugin.configFunction(eleventyConfig, {
      buttonClass: 'test-button',
    });
    const customRendererConfig = {
      iconifyUrl: 'https://example.com/custom.svg',
      iconStyle: 'width: 24px; height: 24px;',
      iconClass: 'test-copy',
      iconTag: 'test-tag',
      buttonClass: 'test-button',
      buttonStyle: 'opacity: 0.1;',
      additionalButtonClass: 'another-button-class',
      title: 'test-title',
    };
    plugin.markdownItCopyButton(md, customRendererConfig);
    const token = { tag: 'code', info: 'yaml', content: 'test: unit-test\ntype: 11ty' };
    const html = md.renderer.rules.fence(
      [token],
      0,
      undefined,
      undefined,
      { renderAttrs: mockRenderAttrs },
    );
    expect(html).toMatchSnapshot();
  });

  test('non-lang-code token(not applied clipboard)', () => {
    plugin.configFunction(eleventyConfig);
    plugin.markdownItCopyButton(md);
    const token = { tag: 'code', info: undefined, content: 'article title' };
    const html = md.renderer.rules.fence([token], 0);
    expect(html).toMatchSnapshot();
  });
});
