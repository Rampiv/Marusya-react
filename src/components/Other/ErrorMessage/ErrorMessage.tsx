import { memo, type FC } from "react"
import './ErrorMessage.scss'

interface ErrorProps {
  error: any
  visible: boolean
}
export const ErrorMessage: FC<ErrorProps> = memo(({ error, visible }) => {
  return <span className={`error ${!visible && "hide"}`}>{error}</span>
})
