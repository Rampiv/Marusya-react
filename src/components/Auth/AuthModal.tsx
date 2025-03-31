import type { FormEvent } from "react"
import { useCallback, useState } from "react"
import { ErrorMessage, Logo } from "../Other"
import "./AuthModal.scss"
import Api from "../../api/api"
import React from "react"
import { useNavigate } from "react-router"
import { Login } from "./Login"
import type { AuthCredentials, RegisterCredentials } from "../../models"
import { Register } from "./Register"

// Мемоизированные иконоки
const LogoMemo = React.memo(Logo)

export const AuthModal = ({ onAuthDataChange }: any) => {
  const [isAuth, setIsAuth] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authCredentials, setAuthCredentials] = useState<AuthCredentials>({
    email: "",
    password: "",
  })

  const navigate = useNavigate()

  const [registerCredentials, setRegisterCredentials] =
    useState<RegisterCredentials>({
      email: "",
      password: "",
      name: "",
      surname: "",
      passwordAgain: "",
    })

  const handleAuthSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      setIsLoading(true)
      setError(null)

      await Api.authUser({
        email: authCredentials.email,
        password: authCredentials.password,
      })
        .then(() => {
          onAuthDataChange(true)
          navigate("/")
        })
        .catch(err => {
          setError("Произошла ошибка при авторизации")
          console.error("Auth error:", err)
        })
        .finally(() => {
          setIsLoading(false)
        })
    },
    [
      authCredentials.email,
      authCredentials.password,
      navigate,
      onAuthDataChange,
    ],
  )

  const handleRegisterSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      if (registerCredentials.password !== registerCredentials.passwordAgain) {
        setError("Пароли не совпадают")
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const result = await Api.registerUser({
          email: registerCredentials.email,
          password: registerCredentials.password,
          name: registerCredentials.name,
          surname: registerCredentials.surname,
        })

        if (result.success) {
          setIsAuth(true)
        } else {
          setError(result.message || "Ошибка регистрации")
        }
      } catch (err) {
        setError("Произошла ошибка при регистрации")
        console.error("Registration error:", err)
      } finally {
        setIsLoading(false)
      }
    },
    [
      registerCredentials.email,
      registerCredentials.name,
      registerCredentials.password,
      registerCredentials.passwordAgain,
      registerCredentials.surname,
    ],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target

      if (isAuth) {
        setAuthCredentials(prev => ({ ...prev, [name]: value }))
      } else {
        setRegisterCredentials(prev => ({ ...prev, [name]: value }))
      }
    },
    [isAuth],
  )

  const handleAuthFormChange = useCallback(() => {
    setIsAuth(!isAuth)
  }, [isAuth])

  return (
    <div className="auth">
      <LogoMemo />
      <form
        className="auth__form"
        onSubmit={isAuth ? handleAuthSubmit : handleRegisterSubmit}
      >
        {isAuth ? (
          <Login
            authCredentials={authCredentials}
            handleInputChange={handleInputChange}
          />
        ) : (
          <Register
            registerCredentials={registerCredentials}
            handleInputChange={handleInputChange}
          />
        )}

        <ErrorMessage error={error} visible={error ? true : false} />

        <button
          className="auth__btn-primary btn-type1"
          type="submit"
          disabled={isLoading}
        >
          {isAuth ? "Войти" : "Создать аккаунт"}
        </button>
        <button
          className="auth__btn-secondary"
          type="button"
          onClick={handleAuthFormChange}
        >
          {isAuth ? "Регистрация" : "У меня есть пароль"}
        </button>
      </form>
    </div>
  )
}
