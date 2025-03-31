export function NumberWithCommas(num: number) {
  if (num) {
    return num.toLocaleString("ru-RU") + " руб."
  }
}
