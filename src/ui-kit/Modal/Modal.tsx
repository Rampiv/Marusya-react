import { CrossIcon } from "@assets/icons"
import "./Modal.scss"
import React, { memo, useCallback } from "react"

type Props = {
  children: React.ReactElement
  isOpen: boolean
  onClose: () => void
}

const CrossIconMemo = React.memo(CrossIcon)

export const Modal = memo(({ children, isOpen, onClose }: Props) => {
  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()
      onClose()
    },
    [onClose],
  )

  if (!isOpen) return null

  return (
    <div
      className={["modal", !isOpen ? "modal_hidden" : ""].join(" ").trim()}
      id="modal"
    >
      <div className="modal__content" id="modalContent">
        {children}
        <button className="modal__btn-close" onClick={handleClose}>
          <CrossIconMemo />
        </button>
      </div>
    </div>
  )
})
