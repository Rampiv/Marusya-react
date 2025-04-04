import { BASE_URL } from "./config"

interface AuthRequest {
  email: string
  password: string
}

export const authUser = async (credentials: AuthRequest) => {
  const url = `${BASE_URL}auth/login`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
    credentials: "include",
  })

  const data = await response.json()

  if (data.result) {
    return { result: true }
  } else {
    return {
      result: false,
      message: data.message || "Ошибка аутентификации",
    }
  }
}
