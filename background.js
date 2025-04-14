chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "analyzeTextWithAI") {
      var inputText = message.payload;  // Text sent from content script
  
      console.log("🧠 Analyzing text with AI: ", inputText.slice(0, 300));  // Log a portion for debugging
  
      // Call OpenAI API with the selected text
      fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer .."  // Replace with your actual API key
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",  // Use gpt-3.5-turbo or gpt-4, as available
          messages: [
            {
              role: "system",
              content: `You are a language analysis tool. When given a block of text, respond ONLY in this JSON format:  
{
    "score": [bias score from 0 (neutral) to 100 (extremely biased)],
    "summary": "[a 2-3 sentence explanation of the bias in the text]"
}
  
  Do not include any commentary outside the JSON.`
            },
            {
              role: "user",
              content: `Analyze the following text for bias:\n\n"${inputText}"`
            }
          ],
          max_tokens: 150  // Limits the size of the response
        })
      })
        .then(res => res.json())
        .then(data => {
          var reply = data.choices[0].message.content;
  
          try {
            // Parse the JSON response returned by GPT-3.5
            var parsed = JSON.parse(reply);
  
            // Extract score and summary
            var score = parsed.score ?? "???";
            var summary = parsed.summary ?? "Could not generate summary.";
  
            console.log("AI Analysis Complete: ", { score, summary });
  
            // Send the results back to the content script
            sendResponse({ score, summary });
          } catch (err) {
            // Error if JSON parsing fails
            console.log("❌ Failed to parse JSON response from OpenAI:", err, "\nRaw response:", reply);
  
            sendResponse({
              score: "???",
              summary: "Failed to parse AI response."
            });
          }
        })
        .catch(err => {
          console.error("❌ Error contacting OpenAI:", err);
          sendResponse({
            score: "???",
            summary: "Failed to contact OpenAI API."
          });
        });
  
      // Keeps the message channel open for async response
      return true;
    }
  });
  
  