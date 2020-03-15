export function truncate(text, limit) {
  return text.length < limit ? text : text.substring(0, limit) + '...';
}

export function getDatetime(dateString) {
  let d = new Date(dateString);
  return d.toUTCString();
}
