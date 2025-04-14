chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["styles/highlight.css"]
    });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"]
    });
  });