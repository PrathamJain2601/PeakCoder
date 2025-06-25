export default function timeAgo(timestamp: string): string {
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now.getTime() - then.getTime();

  const sec = Math.floor(diffMs / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  const month = Math.floor(day / 30);
  const year = Math.floor(day / 365);

  if (sec < 60) return "just now";
  if (min < 60) return `${min} min${min > 1 ? "s" : ""} ago`;
  if (hr < 24) return `${hr} hr${hr > 1 ? "s" : ""} ago`;
  if (day < 30) return `${day} day${day > 1 ? "s" : ""} ago`;
  if (year < 1) return `${month} month${month > 1 ? "s" : ""} ago`;
  if (year < 10) return `${year} year${year > 1 ? "s" : ""} ago`;
  return "10+ years ago";
}
