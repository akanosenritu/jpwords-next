import React, {useContext} from "react"
import {LanguageContext} from "./Providers/LanguageProvider"
import {WordNote} from "../types/WordNote"
import {H6} from "./Headers"

type Props = {
  wordNote: WordNote
}

export const DisplayWordNote: React.FC<Props> = props => {
  const language = useContext(LanguageContext)
  const wordNoteURL = `/${language}/browse/word-notes/${props.wordNote.uuid}/`
  return <div>
    <H6>{props.wordNote.title}</H6>
    <iframe referrerPolicy={"no-referrer"} src={wordNoteURL} style={{width: "100%", borderStyle: "none"}} />
  </div>
}