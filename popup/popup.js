document.getElementById("close-btn").addEventListener("click", () => { window.close(); });

document.getElementById("scan").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab?.id) {
        chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"]});
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