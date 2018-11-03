export function getCurrentYearStartDate() {
  return new Date(`01/01/${(new Date()).getFullYear()}`);
}
