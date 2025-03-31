import { BASE_URL } from "./config"

export const getTopMovies = async () => {
  const url = `${BASE_URL}movie/top10`
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
