const resolveFileType = (type) => {
  if (!type) return "txt";
  switch (true) {
    case ["jpeg", "jpg", "png", "gif"].includes(type):
      return `image/${type}`;
    case ["html", "css", "txt"].includes(type):
      return `text/${type}`;
    case ["mpeg", "mp3", "ogg"].includes(type):
      return `audio/${type}`;
    case ["mp4", "ogg"].includes(type):
      return `video/${type}`;
    default:
      return `text/plain`;
  }
};
export const download = (res, type, filename) => {
  const blob = new Blob([res], {
    type: resolveFileType(type),
  });
  const a = document.createElement("a");
  const URL = window.URL || window.webkitURL;
  const herf = URL.createObjectURL(blob);
  a.href = herf;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(herf);
};
