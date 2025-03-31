export const FormatFullName = (fullName: string) => {
  if (!fullName) return ""

  return fullName
    .trim()
    .split(/\s+/)
    .filter(part => part !== "")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ")
}
