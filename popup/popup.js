document.getElementById("close-btn").addEventListener("click", () => { window.close(); });

document.getElementById("scan").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab?.id) {
        chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"]});
      }
    });
  });

  document.getElementById("ai-btn").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab?.id) {
        chrome.scripting.executeScript( { target: { tabId: tab.id }, files: ["summary.js"]});
      }
    });
  });

  document.getElementById("ai-tab").addEventListener("click", () => {
    document.getElementById("scan-tab-content").style.display = "none";
    document.getElementById("ai-tab-content").style.display = "block";
  });
  
  document.getElementById("scan-tab").addEventListener("click", () => {
    document.getElementById("ai-tab-content").style.display = "none";
    document.getElementById("scan-tab-content").style.display = "block";
  });

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updatePopup") {
      updateText();
    }
  });

  function updateText(){
    chrome.storage.local.get(["aiScore", "aiSummary"], (result) => {
      document.getElementById("ai-score").textContent = `Bias Score: ${result.aiScore ?? "N/A"}`;
      document.getElementById("ai-summary").textContent = result.aiSummary ?? "No summary available.";
    });
  }