import { useContext } from "react"
import { LangContext } from "../contexts/LangContext"

export const useLangContext = () => {
  const context = useContext(LangContext)
  if (!context)
    throw new Error('useLangContext must be used within LangProvider');
  return context
}