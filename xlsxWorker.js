var XLSXCache;

const xlsxhost = "https://cdn.sheetjs.com/xlsx-0.20.3/package/xlsx.mjs";

async function loadXLSX() {
  if (XLSXCache) {
    return XLSXCache;
  }

  XLSXCache = await import(xlsxhost);
  return XLSXCache;
}

self.onmessage = async function (e) {
  const { action, taskType, data } = e.data;

  if (action === "processData") {
    switch (taskType) {
      case "createSheet":
        const XLSX = await loadXLSX();
        createSheet(data.historyList, XLSX);
        break;
    }
  }
};

function createSheet(historyList, XLSX) {
  const formattedHistory = historyList.map((v) => [v.prompt, v.response]);
  const sheetData = [["prompt", "response"], ...formattedHistory];

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(sheetData);
  XLSX.utils.book_append_sheet(wb, ws, "historysheets");

  const file = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([file], { type: "application/octet-stream" });
  self.postMessage(blob);
}
