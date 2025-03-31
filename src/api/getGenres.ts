import { BASE_URL } from "./config"

export const getGenres = async () => {
  const url = `${BASE_URL}movie/genres`
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
