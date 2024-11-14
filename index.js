import { History } from "./history.js";
const history = new History();
const worker = new Worker("xlsxWorker.js");

const submit = document.getElementById("sendPrompt");
const exportHistory = document.getElementById("exportHistory");
const messageInput = document.getElementById("message");
const outputDisplay = document.getElementById("output");
const historyDisplay = document.getElementById("history");
const promptInput = document.getElementById("prompt");

submit.addEventListener("click", async (t) => {
  try {
    const message = messageInput.value;
    const prompt = promptInput.value;
    const session = await ai.assistant.create();

    const messageBuilder = (prompt, message) => {
      return `${prompt} \n ${message}`;
    };

    const stream = await session.promptStreaming(
      messageBuilder(prompt, message)
    );
    for await (const chunk of stream) {
      outputDisplay.value = chunk;
    }

    const response = outputDisplay.value;
    history.add(message, response);

    //populate history
    displayNewHistoryNode(message, response);
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
