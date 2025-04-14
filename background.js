/*

First Try
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


  Second Try
  console.log("background working!");
  chrome.action.onClicked.addListener((tab) => {
    console.log("🔍 Extension icon clicked!");
  
    if (!tab.id) {
      console.error("❌ No tab ID found!");
      return;
    }
  
    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["styles/highlight.css"]
    }, () => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content.js"]
      }, (results) => {
        if (chrome.runtime.lastError) {
          console.error("❌ Script injection failed:", chrome.runtime.lastError.message);
        } else {
          console.log("✅ Script injected:", results);
        }
      });
    });
  });*/
  
  
  