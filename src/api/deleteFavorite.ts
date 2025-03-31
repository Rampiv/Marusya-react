import { BASE_URL } from "./config"

export const deleteFavorite = async (id: number) => {
  const url = `${BASE_URL}favorites/${id}`
  try {
    const response = await fetch(url, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}
