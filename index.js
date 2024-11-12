const submit = document.getElementById("sendPrompt");
const promptInput = document.getElementById("prompt");
const outputDisplay = document.getElementById("output");

submit.addEventListener("click", async (t) => {
  try {
    const session = await ai.assistant.create();

    const stream = await session.promptStreaming(promptInput.value);
    for await (const chunk of stream) {
      outputDisplay.value = chunk;
    }
  } catch (error) {
    outputDisplay.value =
      "Not working? Please go to chrome://flags/#prompt-api-for-gemini-nano and set 'to enabled' gemini-nano “Enabled”.";
  }
});
