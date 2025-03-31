export const GetYoutubeVideoIdByURL = (url: string) => {
  const urlBase = new URL(url)
  return urlBase.searchParams.get("v")
}
