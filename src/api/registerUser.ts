import { BASE_URL } from "./config"

interface RegisterRequest {
  email: string
  password: string
  name: string
  surname: string
}

interface RegisterResponse {
  success: boolean
  message?: string
}

export const registerUser = async (
  credentials: RegisterRequest,
): Promise<RegisterResponse> => {
  const url = `${BASE_URL}user`

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

    if (data.success) {
      return { success: true }
    } else {
      return {
        success: false,
        message: data.message || "Authentication failed",
      }
    }
  } catch (error) {
    console.error("Auth error:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown auth error",
    }
  }
}
