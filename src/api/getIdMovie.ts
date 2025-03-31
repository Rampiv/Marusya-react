import { BASE_URL } from "./config"

export const getIdMovie = async (id: string) => {
  const url = `${BASE_URL}movie/${id}`
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
