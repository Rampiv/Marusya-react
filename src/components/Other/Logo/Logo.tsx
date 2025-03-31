import { Link } from "react-router"
import "./Logo.scss"
import logo from "../../../assets/logo.svg"

export const Logo = () => {
  return (
    <Link to={"/"} className="logo" aria-label="Вернуться на главную">
      <img src={logo} alt="Logo VK Маруся" className="logo-img" />
      <p className="logo-text">маруся</p>
    </Link>
  )
}
