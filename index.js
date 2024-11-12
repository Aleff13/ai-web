const submit = document.getElementById("sendPrompt");
const promptInput = document.getElementById("prompt");
const outputDisplay = document.getElementById("output");

submit.addEventListener("click", async (t) => {
  const session = await ai.assistant.create();

  const stream = await session.promptStreaming(promptInput.value);
  for await (const chunk of stream) {
    outputDisplay.value = chunk;
  }
});
