import { useContext } from "react"
import { SessionContext } from "../SessionContextProvider"

export const useSessionContext = () => {
  return useContext(SessionContext)
}
