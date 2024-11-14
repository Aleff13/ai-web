import { History } from "./history.js";
const history = new History();
const worker = new Worker("xlsxWorker.js");

const submit = document.getElementById("sendPrompt");
const exportHistory = document.getElementById("exportHistory");
const promptInput = document.getElementById("prompt");
const outputDisplay = document.getElementById("output");
const historyDisplay = document.getElementById("history");

submit.addEventListener("click", async (t) => {
  try {
    const prompt = promptInput.value;
    const session = await ai.assistant.create();

    const stream = await session.promptStreaming(prompt);
    for await (const chunk of stream) {
      outputDisplay.value = chunk;
    }

    const response = outputDisplay.value;
    history.add(prompt, response);

    //populate history
    displayNewHistoryNode(prompt, response);
  } catch (error) {
    outputDisplay.value =
      "Not working? Please go to chrome://flags/#prompt-api-for-gemini-nano and set 'to enabled' gemini-nano “Enabled”.";

    console.error(error);
  }

  function displayNewHistoryNode(prompt, response) {
    const historyNode = document.createElement("textarea");
    historyNode.className = "historyNode";
    historyNode.value = prompt + response;
    historyDisplay.appendChild(historyNode);
    exportHistory.style.display = "flex";
  }
});

exportHistory.addEventListener("click", async (e) => {
  worker.postMessage({
    action: "processData",
    taskType: "createSheet",
    data: { historyList: history.list },
  });
});

worker.onmessage = function (e) {
  const blob = e.data;
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "history.xlsx";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
