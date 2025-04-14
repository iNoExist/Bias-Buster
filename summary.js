console.log("📘 summary.js running...");

function getSelectedText() {
  var selection = window.getSelection();
  return selection ? selection.toString().trim() : "";
}

var selectedText = getSelectedText();

if (!selectedText) {
  alert("Please highlight some text before running Bias Buster AI.");
} else {
  console.log("🧠 Selected text:", selectedText.slice(0, 300));

  var fakeScore = selectedText.length > 100 
    ? Math.floor(Math.random() * 100) 
    : "???";
  var fakeSummary = selectedText.length > 100
    ? "This section seems moderately biased."
    : "Not enough content to analyze bias.";

  chrome.storage.local.set({
    aiScore: fakeScore,
    aiSummary: fakeSummary
  }, function() {
    console.log("✅ Stored AI score and summary from selection.");
  });
}

