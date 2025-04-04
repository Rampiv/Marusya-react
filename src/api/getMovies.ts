import { BASE_URL } from "./config"

interface Props {
  query: "title" | 'page' | 'count' | 'genre' | null
  value: string | null
}

export const getMovies = async ({ query, value }: Props) => {
  let url = `${BASE_URL}movie`
  if (query && value) {
    url = `${BASE_URL}movie?${query}=${value}`
  }
  try {
    const response = await fetch(url)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
