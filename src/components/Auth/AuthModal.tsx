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

      setErrorAuth({
        message: "",
        elements: {
          email: "",
          password: "",
          passwordAgain: "",
          name: "",
          surname: "",
        },
      })

      register({
        email: registerCredentials.email,
        password: registerCredentials.password,
        name: registerCredentials.name,
        surname: registerCredentials.surname,
        passwordAgain: registerCredentials.passwordAgain,
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
      setErrorAuth({ message: "" })
      if (isAuth) {
        setAuthCredentials(prev => ({ ...prev, [name]: value }))
      } else {
        setRegisterCredentials(prev => ({ ...prev, [name]: value }))
      }
    },
    [isAuth, setErrorAuth],
  )

  const handleAuthFormChange = useCallback(() => {
    setIsAuth(!isAuth)
    setErrorAuth({ message: "" })
  }, [isAuth, setErrorAuth])

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
            error={{
              email: errorAuth.elements?.email ?? "",
              password: errorAuth.elements?.password ?? "",
            }}
          />
        ) : (
          <RegisterMemo
              registerCredentials={registerCredentials}
              handleInputChange={handleInputChange} error={{
                email: errorAuth.elements?.email ?? "",
                password: errorAuth.elements?.password ?? "",
                passwordAgain: errorAuth.elements?.passwordAgain ?? "",
                name: errorAuth.elements?.name ?? "",
                surname: errorAuth.elements?.surname ?? "",
              }}          />
        )}

        <ErrorMessage
          error={errorAuth?.message}
          visible={errorAuth ? true : false}
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
