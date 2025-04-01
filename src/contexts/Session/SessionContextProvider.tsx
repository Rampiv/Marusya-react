import Api from "@api/api"
import type { Profile } from "@models/Profile"
import { createContext, useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router"

interface AuthResponse {
  result: boolean
  message?: string
}

type SessionContextValues = {
  profile: Profile | null
  isPending: boolean
  login: (params: { email: string; password: string }) => void
  logout: () => void
  register: (params: {
    email: string
    password: string
    name: string
    surname: string
  }) => void
  setProfile: (profile: Profile | null) => void
  errorAuth: AuthResponse
  setErrorAuth: (response: AuthResponse) => void
}

export const SessionContext = createContext<SessionContextValues>({
  profile: null,
  isPending: false,
  login: () => {},
  logout: () => {},
  register: () => {},
  setProfile: () => {},
  errorAuth: { message: "", result: false },
  setErrorAuth: () => {},
})

type Props = {
  children?: React.ReactElement
}

export const SessionContextProvider = ({ children }: Props) => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [errorAuth, setErrorAuth] = useState<AuthResponse>({
    message: "",
    result: false,
  })

  const navigate = useNavigate()

  const goToHomePage = useCallback(() => {
    navigate("/")
  }, [navigate])

  // Инициализируем profile при загрузке
  useEffect(() => {
    const initProfile = async () => {
      try {
        setIsPending(true)

        const profileData = await Api.getProfile()
        setProfile(profileData)
      } catch (error) {
        setProfile(null)
      } finally {
        setIsPending(false)
      }
    }

    initProfile()
  }, [])

  const login = useCallback(
    async (params: { email: string; password: string }) => {
      setIsPending(true)

      try {
        const { email, password } = params
        const response = await Api.authUser({ email, password })

        setErrorAuth(response)

        // Если выполнится с ошибкой, до сюда не дойдет
        const profileData = await Api.getProfile()
        setProfile(profileData)

        goToHomePage()
      } catch (error) {
        console.log("loginError", error)
      } finally {
        setIsPending(false)
      }
    },
    [goToHomePage],
  )
  const register = useCallback(
    async (params: {
      email: string
      password: string
      name: string
      surname: string
    }) => {
      setIsPending(true)

      try {
        const { email, password, name, surname } = params
        await Api.registerUser({ email, password, name, surname })

        // Если выполнится с ошибкой, до сюда не дойдет
        login({ email, password })
      } catch (error) {
        console.log("registerError", error)
      } finally {
        setIsPending(false)
      }
    },
    [login],
  )

  const logout = useCallback(async () => {
    try {
      await Api.logoutUser()

      setProfile(null)
      goToHomePage()
      window.location.reload()
    } catch (error) {
      console.log("Не удалось выйти")
    }
  }, [goToHomePage])

  return (
    <SessionContext.Provider
      value={{
        profile,
        login,
        register,
        logout,
        isPending,
        setProfile,
        errorAuth,
        setErrorAuth,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}
