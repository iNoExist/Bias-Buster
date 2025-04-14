console.log("popup.js loaded");

document.getElementById("close-btn").addEventListener("click", () => {
  window.close(); // Closes the popup window
});

document.getElementById("scan").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      if (tab?.id) {
        console.log("clicked");
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content.js"]
        },
        (result) => {
            if (chrome.runtime.lastError) {
              console.error("Error executing script: ", chrome.runtime.lastError);
            } else {
              console.log("Script executed successfully.");
            }
        });
      }
    });
  });