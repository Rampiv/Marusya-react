import type { MouseEventHandler } from "react"
import "./Overlay.scss"

interface Props {
  isOpenOverlay: boolean
  closeOverlay: MouseEventHandler<HTMLDivElement>,
  className?: string
}
export const Overlay = ({ isOpenOverlay, closeOverlay, className }: Props) => {
  return (
    <div
      className={`overlay ${!isOpenOverlay ? "hide" : ""} ${className}`}
      onClick={closeOverlay}
    ></div>
  )
}
