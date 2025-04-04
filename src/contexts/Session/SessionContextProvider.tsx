import Api from "@api/api"
import type { Profile } from "@models/Profile"
import { createContext, useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { validateLoginForm, validateRegisterForm } from "../../utils"

interface AuthResponse {
  result?: boolean
  message?: string
}

interface RegisterResponse extends AuthResponse {
  success?: boolean
}

interface FormErrors extends RegisterResponse {
  message: string
  elements?: {
    email?: string
    password?: string
    passwordAgain?: string
    name?: string
    surname?: string
  }
}

type SessionContextValues = {
  profile: Profile | null
  isPending: boolean
  login: any
  logout: () => void
  register: (params: {
    email: string
    password: string
    passwordAgain: string
    name: string
    surname: string
  }) => void
  setProfile: (profile: Profile | null) => void
  errorAuth: FormErrors
  setErrorAuth: (errorAuth: FormErrors) => void
}

export const SessionContext = createContext<SessionContextValues>({
  profile: null,
  isPending: false,
  login: () => {},
  logout: () => {},
  register: () => {},
  setProfile: () => {},
  errorAuth: {
    message: "",
    elements: {
      email: "",
      password: "",
      name: "",
      surname: "",
    },
  },
  setErrorAuth: () => {},
})

type Props = {
  children?: React.ReactElement
}

export const SessionContextProvider = ({ children }: Props) => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isPending, setIsPending] = useState(false)
  const [errorAuth, setErrorAuth] = useState<FormErrors>({
    message: "",
    elements: {
      email: "",
      password: "",
      passwordAgain: "",
      name: "",
      surname: "",
    },
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
        // валидация
        const errors = validateLoginForm(params)
        if (Object.keys(errors).length > 0) {
          setErrorAuth({
            message: `${errors.email ? `${errors.email}. ` : ""} ${errors.password ? `${errors.password}. ` : ""}`,
            elements: {
              email: errors.email || "",
              password: errors.password || "",
            },
          })
          return
        }

        const { email, password } = params
        const response = await Api.authUser({ email, password })
        if (!response.result) {
          setErrorAuth({message: 'Ошибка авторизации'})
        }

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
      passwordAgain: string
      name: string
      surname: string
    }) => {
      setIsPending(true)

      try {
        // валидация
        const errors = validateRegisterForm(params)
        if (Object.keys(errors).length > 0) {
          setErrorAuth({
            message: `${errors.email ? `${errors.email}. ` : ""}${errors.name ? `${errors.name}. ` : ""}${errors.surname ? `${errors.surname}. ` : ""}${errors.password ? `${errors.password}. ` : ""}${errors.passwordAgain ? `${errors.passwordAgain}. ` : ""}`,
            elements: {
              email: errors.email || "",
              password: errors.password || "",
              passwordAgain: errors.passwordAgain || "",
              name: errors.name || "",
              surname: errors.surname || "",
            },
          })
          return
        }

        const { email, password, name, surname } = params
        const response = await Api.registerUser({
          email,
          password,
          name,
          surname,
        })
        if (!response.success) {
          setErrorAuth({message: 'Ошибка регистрации'})
        }

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
