export function dateToUnixStamp(date: Date): number {
  return +date.getTime() / 1000
}
