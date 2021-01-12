import React, {useContext} from "react";
import {LanguageContext} from "./Providers/LanguageProvider"

export const EnglishTranslation: React.FC = props => {
  const language = useContext(LanguageContext)
  return <>
    {language === "en" && props.children}
  </>
}

export const SpanishTranslation: React.FC = props => {
  const language = useContext(LanguageContext)
  return <>
    {language === "es" && props.children}
  </>
}