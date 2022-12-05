(function () {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  chrome.runtime.onMessage.addListener((data, sender) => {
    document.body.style.filter = "unset !important";
    if (data.value === 1) {
      document.designMode = "on";
    } else {
      document.designMode = "off";
    }
    if (data.type === "handle_me") {
      return Promise.resolve("done");
    }
    return false;
  });
})();
