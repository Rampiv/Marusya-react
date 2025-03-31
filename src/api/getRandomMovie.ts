import { BASE_URL } from "./config"

export const getRandomMovie = async () => {
  const url = `${BASE_URL}movie/random`
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
