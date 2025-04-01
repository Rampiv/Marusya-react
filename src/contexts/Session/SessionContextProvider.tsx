import Api from "@api/api"
import type { Profile } from "@models/Profile"
import { createContext, useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router"

type SessionContextValues = {
  profile: Profile | null
  isPending: boolean
  login: (params: { email: string; password: string }) => void
  logout: () => void
  // ...etc
}

export const SessionContext = createContext<SessionContextValues>({
  profile: null,
  isPending: false,
  login: () => {},
  logout: () => {},
  // ...etc
})

type Props = {
  children?: React.ReactElement
}

export const SessionContextProvider = ({ children }: Props) => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isPending, setIsPending] = useState(false)

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
        console.log("params", params)
        const { email, password } = params
        await Api.authUser({ email, password })

        // Если authUser выполнится с ошибкой, до сюда не дойдет
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

  const logout = useCallback(async () => {
    try {
      await Api.logoutUser()

      setProfile(null)
      goToHomePage()
    } catch (error) {
      console.log("Не удалось выйти")
    }
  }, [goToHomePage])

  return (
    <SessionContext.Provider value={{ profile, login, logout, isPending }}>
      {children}
    </SessionContext.Provider>
  )
}
