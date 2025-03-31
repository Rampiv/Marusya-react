export const getTimeFromMins = (mins: string | number) => {
  if (typeof mins === typeof 0) {
    let hours = Math.trunc(Number(mins) / 60)
    let minutes = Number(mins) % 60
    return hours + " ч " + minutes + " мин"
  }
}
