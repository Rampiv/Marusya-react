import type { FormEvent } from "react"
import { useCallback, useState } from "react"
import { ErrorMessage, Logo } from "../Other"
import "./AuthModal.scss"
import React from "react"
import { Login } from "./Login"
import type { AuthCredentials, RegisterCredentials } from "../../models"
import { Register } from "./Register"
import { useSessionContext } from "@contexts/Session"

// Мемоизированные иконоки
const LogoMemo = React.memo(Logo)
const LoginMemo = React.memo(Login)
const RegisterMemo = React.memo(Register)

export const AuthModal = () => {
  const {
    login,
    register,
    isPending: isPendingSession,
    errorAuth,
    setErrorAuth,
  } = useSessionContext()

  const [isAuth, setIsAuth] = useState(true)
  const [authCredentials, setAuthCredentials] = useState<AuthCredentials>({
    email: "",
    password: "",
  })
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

      login({
        email: authCredentials.email,
        password: authCredentials.password,
      })
    },
    [authCredentials.email, authCredentials.password, login],
  )

  const handleRegisterSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      if (registerCredentials.password !== registerCredentials.passwordAgain) {
        setErrorAuth({ message: "Пароли не совпадают", result: true })
        return
      }

      setErrorAuth({ message: "", result: false })

      register({
        email: registerCredentials.email,
        password: registerCredentials.password,
        name: registerCredentials.name,
        surname: registerCredentials.surname,
      })
    },
    [
      register,
      registerCredentials.email,
      registerCredentials.name,
      registerCredentials.password,
      registerCredentials.passwordAgain,
      registerCredentials.surname,
      setErrorAuth,
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
          <LoginMemo
            authCredentials={authCredentials}
            handleInputChange={handleInputChange}
          />
        ) : (
          <RegisterMemo
            registerCredentials={registerCredentials}
            handleInputChange={handleInputChange}
          />
        )}

        <ErrorMessage
          error={errorAuth.message ?? "Непредвиденная ошибка"}
          visible={!errorAuth.result ? true : false}
        />

        <button
          className="auth__btn-primary btn-type1"
          type="submit"
          disabled={isPendingSession}
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
