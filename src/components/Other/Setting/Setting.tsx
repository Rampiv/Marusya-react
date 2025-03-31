import type { FC } from "react"
import { FormatFullName, GetInitials } from "../../../utils"
import "./Setting.scss"
import { MailIcon } from "@assets/icons"
import React from "react"

interface Props {
  fullname: string
  email: string
  onClick: ()=>void
}

const MailIconMemo = React.memo(MailIcon)

export const Setting: FC<Props> = ({ fullname, email, onClick}) => {
  return (
    <div className="setting">
      <ul className="setting__list">
        <li className="setting__list-item">
          <div className="setting__icon">
            <span className="setting__icon-text">{GetInitials(fullname)}</span>
          </div>
          <ul className="setting__list-personal">
            <li className="setting__title">Имя Фамилия</li>
            <li className="setting__descr">{FormatFullName(fullname)}</li>
          </ul>
        </li>
        <li className="setting__list-item">
          <div className="setting__icon">
            <MailIconMemo />
          </div>
          <ul className="setting__list-personal">
            <li className="setting__title">Электронная почта</li>
            <li className="setting__descr">{email}</li>
          </ul>
        </li>
      </ul>
      <button className="btn-standart btn-type1" onClick={onClick}>Выйти из аккаунта</button>
    </div>
  )
}
