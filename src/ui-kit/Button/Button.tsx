import { Link } from "react-router"
import "./Button.scss"
interface Props {
  children?: React.ReactElement | string
  onClick: () => void
  type?: "btn-type1" | "btn-type2" | "btn-type3"
  url: string
  clasName?: 'string'
}
export const Button = ({
  children,
  onClick,
  type = "btn-type1",
  url,
  clasName
}: Props) => {
  return (
    <Link
      to={url}
      className={["btn-standart", type, clasName].join(" ").trim()}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}
