console.log("🚀 Bias Buster content script running!");

// Inject highlight.css manually
const cssLink = document.createElement("link");
cssLink.rel = "stylesheet";
cssLink.type = "text/css";
cssLink.href = chrome.runtime.getURL("styles/highlight.css");
document.head.appendChild(cssLink);
console.log("🎨 highlight.css manually injected!");

// Fetch the JSON data
fetch(chrome.runtime.getURL("data/bias_words.json"))
  .then(res => {
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return res.json();
  })
  .then(biasWords => {
    console.log("📦 Bias words loaded:", biasWords);

    const walk = (node) => {
      if (node.nodeType === 3) {
        const original = node.nodeValue;
        const replaced = original.replace(
          new RegExp(`\\b(${Object.keys(biasWords).join("|")})\\b`, "gi"),
          (match) => {
            const replacement = biasWords[match.toLowerCase()];
            console.log(`🔄 Replacing "${match}" → "${replacement}"`);
            return `<span class="bias-highlight" title="Originally: ${match}">${replacement}</span>`;
          }
        );

        if (original !== replaced) {
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

    walk(document.body);
    console.log("✅ DOM processed. Replacements complete.");
  })
  .catch(err => {
    console.error("❌ Failed to load or process bias_words.json:", err);
  });
