console.log("🚀 Bias Buster content script running!");

const biasWordsURL = chrome.runtime.getURL("data/bias_words.json");
console.log(`📂 Fetching bias words from: ${biasWordsURL}`);

fetch(biasWordsURL)
  .then(res => {
    if (!res.ok) {
      console.error(`❌ HTTP error while fetching bias_words.json. Status: ${res.status}`);
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    console.log("✅ bias_words.json successfully fetched.");
    return res.json();
  })
  .then(biasWords => {
    console.log("📦 Parsed biasWords JSON:", biasWords);

    const walk = (node) => {
      if (node.nodeType === 3) {
        const original = node.nodeValue;
        const replaced = original.replace(
          new RegExp(`\\b(${Object.keys(biasWords).join("|")})\\b`, "gi"),
          (match) => {
            const replacement = biasWords[match.toLowerCase()];
            console.log(`🔍 Found biased word: "${match}" → Suggestion: "${replacement}"`);
            return `<span class="bias-highlight" title="Try: ${replacement}">${match}</span>`;
          }
        );

        if (original !== replaced) {
          console.log(`📝 Replacing text in node: "${original}"`);
          const span = document.createElement("span");
          span.innerHTML = replaced;
          node.parentNode.replaceChild(span, node);
        }
      } else {
        for (let child of node.childNodes) {
          walk(child);
        }
      }
    };

    console.log("🔁 Starting DOM traversal...");
    walk(document.body);
    console.log("✅ Finished scanning and highlighting biased language.");

  })
  .catch(err => {
    console.error("❌ Error loading or processing bias_words.json:", err);
  });
