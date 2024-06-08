export function formatCurrentDateTime(date) {
  if (!date) return;

  const newDate = new Date(date);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = newDate.getDate();
  const month = monthNames[newDate.getMonth()];
  const year = newDate.getFullYear();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();

  const formattedMinutes = String(minutes).padStart(2, "0");

  const formattedDate = `${day} ${month} ${year} ${String(hours).padStart(
    2,
    "0"
  )}:${formattedMinutes}`;

  return formattedDate;
}
