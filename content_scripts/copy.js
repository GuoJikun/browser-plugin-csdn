(function () {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  const href = window.location.href;
  if (href.startsWith("https://www.baidu.com/")) {
    const style = document.createElement("style");
    style.innerHTML = `body.big-event-gray .water-container,body.big-event-gray #aging-tools-pc div[class^=item-wrap], body.big-event-gray #bottom_layer, body.big-event-gray #bottom_layer .tip-hover-panel, body.big-event-gray #form, body.big-event-gray #passport-login-pop, body.big-event-gray #s-hotsearch-wrapper, body.big-event-gray #s_content_1, body.big-event-gray #s_content_100, body.big-event-gray #s_menu_gurd, body.big-event-gray #s_side_wrapper, body.big-event-gray #u1, body.big-event-gray .advert-shrink, body.big-event-gray .bdlayer, body.big-event-gray .popup-advert, body.big-event-gray .s-ctner-menus .s-menu-item-underline, body.big-event-gray .s-menu-container, body.big-event-gray .s-news-rank-wrapper, body.big-event-gray .s-skin-container.skin-gray-event, body.big-event-gray .s-top-left-new.s-isindex-wrap, body.big-event-gray .under-searchbox-tips, body.big-event-gray>div[class^=cards_pop] {
        -webkit-filter: none !important;
        -moz-filter: none !important;
        -ms-filter: none !important;
        -o-filter: none !important;
        filter: none !important;
    }`;
    document.head.appendChild(style);
  } else {
    document
      .querySelector("html")
      .setAttribute(
        "style",
        `${document
          .querySelector("html")
          .getAttribute(
            "style"
          )}filter: none !important;-webkit-filter: none !important`
      );
    document
      .querySelector("body")
      .setAttribute(
        "style",
        `${document
          .querySelector("body")
          .getAttribute(
            "style"
          )}filter: none !important;-webkit-filter: none !important`
      );
  }

  if (window.hasRun) {
    return;
  }
  window.hasRun = true;
  chrome.runtime.onMessage.addListener((data, sender) => {
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
