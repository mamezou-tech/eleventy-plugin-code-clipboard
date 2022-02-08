function showTooltip(el, msg) {
  if (!el.trigger.className.includes('tooltipped')) {
    el.trigger.children[0].className = 'tooltipped tooltipped-s';
    el.trigger.children[0].ariaLabel = msg;
  }
}

window.onload = () => {
  const clipboard = new ClipboardJS(''); // replaced by plugin
  clipboard.on('success', (el) => showTooltip(el, 'Copied!'));
  clipboard.on('error', (el) => showTooltip(el, 'Failed...'));
};
