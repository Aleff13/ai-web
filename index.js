import { History } from "./history.js";

const submit = document.getElementById("sendPrompt");
const exportHistory = document.getElementById("exportHistory");

const promptInput = document.getElementById("prompt");
const outputDisplay = document.getElementById("output");
const historyDisplay = document.getElementById("history");

const history = new History();

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
  }
});

exportHistory.addEventListener("click", async (e) => {
  const XLSX = await import(
    "https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs"
  );

  const formatedHistory = history.list.map((v) => [v.prompt, v.response]);

  const data = [["prompt", "response"], ...formatedHistory];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, "historysheets");

  XLSX.writeFile(wb, "history.xlsx");
});
