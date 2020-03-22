export function truncate(text, limit) {
  return text.length < limit ? text : text.substring(0, limit) + '...';
}

export function getDatetime(dateString) {
  if (!dateString) return 'Unset';
  let d = new Date(dateString);
  return d.toUTCString().replace(' GMT', '');
}
