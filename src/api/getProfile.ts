import type { Profile } from "../models"
import { BASE_URL } from "./config"

export const getProfile = async (): Promise<Profile | null> => {
  const url = `${BASE_URL}profile`
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })

  if (!response.ok) return null
  const data = await response.json()
  return data
}
