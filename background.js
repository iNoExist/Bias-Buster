chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "analyzeText") {
    // Send the text to the server for analysis
    fetch('https://biasbuster-api.onrender.com/analyze', {  // Your deployed server URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: request.text })
    })
      .then(response => response.json())
      .then(data => {
        // Send the results back to the content script or popup
        sendResponse({ score: data.score, summary: data.summary });
      })
      .catch(err => {
        console.error("Error contacting AI server:", err);
        sendResponse({ score: "???", summary: "Error contacting AI server." });
      });
    return true; // Keep the message channel open for async response
  }
});