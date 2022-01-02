function toggleTooltip(el, msg) {
  if (!el.trigger.className.includes('tooltipped')) {
    el.trigger.children[0].className = 'tooltipped tooltipped-s';
    el.trigger.children[0].ariaLabel = msg;
  }
  setTimeout(() => {
    el.trigger.children[0].className = '';
    el.trigger.children[0].ariaLabel = '';
  }, 2000);
}

window.onload = () => {
  const clipboard = new ClipboardJS(''); // replaced by plugin
  clipboard.on('success', (e) => toggleTooltip(e, 'Copied!'));
  clipboard.on('error', (e) => toggleTooltip(e, 'Failed...'));
};
