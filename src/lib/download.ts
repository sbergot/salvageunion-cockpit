export function download(storageKey: string) {
  const filename = `${storageKey}.json`;
  const text = localStorage[storageKey];
  downLoadText(filename, text);
}

export function downloadJson(name: string, data: object) {
  const filename = `${name}.json`;
  const text = JSON.stringify(data, null, 2);
  downLoadText(filename, text);
}

function downLoadText(filename: string, text: string) {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}