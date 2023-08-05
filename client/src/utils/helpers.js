export function formatTimestamp(timestamp) {
  const currentDate = new Date();
  const targetDate = new Date(timestamp);

  if (
    currentDate.getDate() === targetDate.getDate() &&
    currentDate.getMonth() === targetDate.getMonth() &&
    currentDate.getFullYear() === targetDate.getFullYear()
  ) {
    return `Today, ${targetDate.getHours()}:${targetDate.getMinutes()}`;
  } else if (
    currentDate.getDate() - 1 === targetDate.getDate() &&
    currentDate.getMonth() === targetDate.getMonth() &&
    currentDate.getFullYear() === targetDate.getFullYear()
  ) {
    return `Yesterday, ${targetDate.getHours()}:${targetDate.getMinutes()}`;
  } else {
    return targetDate.toLocaleString('en-UK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
