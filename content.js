console.log("Bias Buster content script running!");

fetch(chrome.runtime.getURL("data/bias_words.json"))
  .then(res => res.json())
  .then(biasWords => {
    const walk = (node) => {
      if (node.nodeType === 3) {
        const original = node.nodeValue;
        const replaced = original.replace(
          new RegExp(`\\b(${Object.keys(biasWords).join("|")})\\b`, "gi"),
          (match) => {
            const replacement = biasWords[match.toLowerCase()];
            return `<span class="bias-highlight" title="Try: ${replacement}">${match}</span>`;
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
  });
