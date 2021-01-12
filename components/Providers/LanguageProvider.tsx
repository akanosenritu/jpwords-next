import React from "react"
import {Language} from "../../types/Language";

export const LanguageContext = React.createContext<Language>("en")

type LanguageProviderProps = {
  language: Language
}

export const LanguageProvider: React.FC<LanguageProviderProps> = props => {
  return <LanguageContext.Provider value={props.language}>
    {props.children}
  </LanguageContext.Provider>
}