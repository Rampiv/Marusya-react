import { MailIcon, PasswordIcon } from "@assets/icons"
import type { FC } from "react"
import React from "react"
import type { AuthCredentials } from "../../models"

interface Props {
  authCredentials: AuthCredentials
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>
  error: {
    email: string
    password: string
  }
}

const MailIconMemo = React.memo(MailIcon)
const PasswordIconMemo = React.memo(PasswordIcon)

export const Login: FC<Props> = ({
  authCredentials,
  handleInputChange,
  error = { email: '', password: '' },
}) => {

  return (
    <fieldset className="auth__fieldset">
      <label className="auth__label">
        <input
          className={`auth__label-input ${error.email ? "auth__label-error" : ""}`}
          type="email"
          name="email"
          placeholder="Электронная почта"
          value={authCredentials.email}
          onChange={handleInputChange}
          // required
        />
        <MailIconMemo />
      </label>

      <label className="auth__label">
        <input
          className={`auth__label-input ${error.password ? "auth__label-error" : ""}`}
          type="text"
          name="password"
          placeholder="Пароль"
          value={authCredentials.password}
          onChange={handleInputChange}
          // required
          // minLength={6}
        />
        <PasswordIconMemo />
      </label>
    </fieldset>
  )
}
