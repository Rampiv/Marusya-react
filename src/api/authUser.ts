import { BASE_URL } from "./config"

interface AuthRequest {
  email: string
  password: string
}

interface AuthResponse {
  result: boolean
  message?: string
}

export const authUser = async (
  credentials: AuthRequest,
): Promise<AuthResponse> => {
  const url = `${BASE_URL}auth/login`
  try {
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
  } catch (error) {
    console.error("Ошибка аутентификации:", error)
    return {
      result: false,
      message: error instanceof Error ? error.message : "Неизвестная ошибка аутентификации",
    }
  }
}
