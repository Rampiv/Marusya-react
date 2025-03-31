import { BASE_URL } from "./config"

export const addFavorite = async (id: string) => {
  const url = `${BASE_URL}favorites`
  try {
    const response = await fetch(url, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
    const data = response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
