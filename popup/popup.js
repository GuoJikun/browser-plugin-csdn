const root = document.querySelector(".root");
const test = document.querySelector("#test");

// 获取当前选项卡ID
function getCurrentTabId(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (callback) callback(tabs.length ? tabs[0].id : null);
  });
}

function sendMessageToContent(message) {
  getCurrentTabId((tabId) => {
    if (tabId !== null) chrome.tabs.sendMessage(tabId, message);
  });
}

root.addEventListener("click", (ev) => {
  const target = ev.target;
  const value = target.getAttribute("value");
  if (value === undefined) {
    return;
  } else if (value === "1") {
    sendMessageToContent({ value: 1 });
  } else {
    sendMessageToContent({ value: 0 });
  }
  window.close();
});
