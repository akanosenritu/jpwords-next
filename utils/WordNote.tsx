import fetch from "node-fetch"
import {WordNote} from "../types/WordNote"
import {Language} from "../types/Language"

export const loadWordNoteContentFromAzure = async (uuid: string) => {
  const res = await fetch(`https://jpwords.blob.core.windows.net/word-notes/${uuid}.mdx`)
  return res.text()
}

type WordNoteData = {
  wordNotes: (WordNote & {
    contents: {
      [lang in Language]: string
    }
  })[]
}
export const loadWordNoteDataFromAzure = async () => {
  const res = await fetch("https://jpwords.blob.core.windows.net/word-notes/wordNotes.json")
  const data = await res.json()
  return data as WordNoteData
}