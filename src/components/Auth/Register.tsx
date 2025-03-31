import { MailIcon, PasswordIcon, UserIcon } from "@assets/icons"
import type { RegisterCredentials } from "../../models"
import type { FC } from "react"
import React from "react"

interface Props {
  registerCredentials: RegisterCredentials
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>
}

const MailIconMemo = React.memo(MailIcon)
const PasswordIconMemo = React.memo(PasswordIcon)
const UserIconMemo = React.memo(UserIcon)

export const Register: FC<Props> = ({
  registerCredentials,
  handleInputChange,
}) => {
  return (
    <fieldset className="auth__fieldset">
      <label className="auth__label">
        <input
          className="auth__label-input"
          type="email"
          name="email"
          placeholder="Электронная почта"
          value={registerCredentials.email}
          onChange={handleInputChange}
          required
        />
        <MailIconMemo />
      </label>

      <label className="auth__label">
        <input
          className="auth__label-input"
          type="text"
          name="name"
          placeholder="Имя"
          value={registerCredentials.name}
          onChange={handleInputChange}
          required
        />
        <UserIconMemo />
      </label>

      <label className="auth__label">
        <input
          className="auth__label-input"
          type="text"
          name="surname"
          placeholder="Фамилия"
          value={registerCredentials.surname}
          onChange={handleInputChange}
          required
        />
        <UserIconMemo />
      </label>

      <label className="auth__label">
        <input
          className="auth__label-input"
          type="password"
          name="password"
          placeholder="Пароль"
          value={registerCredentials.password}
          onChange={handleInputChange}
          required
          minLength={6}
        />
        <PasswordIconMemo />
      </label>

      <label className="auth__label">
        <input
          className="auth__label-input"
          type="password"
          name="passwordAgain"
          placeholder="Подтвердите пароль"
          value={registerCredentials.passwordAgain}
          onChange={handleInputChange}
          required
          minLength={6}
        />
        <PasswordIconMemo />
      </label>
    </fieldset>
  )
}
