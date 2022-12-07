"use strict";

let tab;

const notify = (message) =>
  chrome.notifications.create({
    title: chrome.runtime.getManifest().name,
    type: "basic",
    iconUrl: "data/icons/48.png",
    message,
  });

{
  const onStartup = () => {
    chrome.contextMenus.create({
      id: "blacklist-toggle",
      title: "Add to or remove from blacklist",
      contexts: ["browser_action"],
      documentUrlPatterns: ["http://*/*", "https://*/*"],
    });
  };
  chrome.runtime.onInstalled.addListener(onStartup);
  chrome.runtime.onStartup.addListener(onStartup);
}

chrome.contextMenus.onClicked.addListener((info, t) => {
  if (info.menuItemId === "blacklist-toggle") {
    if (t.url.startsWith("http")) {
      const { hostname } = new URL(t.url);
      const type = info.menuItemId.replace("-toggle", "");
      chrome.storage.local.get(
        {
          [type]: [],
        },
        (prefs) => {
          const index = prefs[type].indexOf(hostname);
          if (index > -1) {
            prefs[type].splice(index, 1);
          } else {
            prefs[type].push(hostname);
          }
          notify(
            index > -1
              ? `"${hostname}" is removed from the ${type}`
              : `"${hostname}" is added to the ${type}`
          );
          tab = t;
          chrome.storage.local.set(prefs);
        }
      );
    } else {
      notify(chrome.i18n.getMessage("bg_warning"));
    }
  }
});
