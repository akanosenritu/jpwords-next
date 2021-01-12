import {APIWordList, WordListLoaded, WordListSummary} from "../types/WordList";
import fetch from "node-fetch";
import {convertAPIWord} from "./Word";
import {Language} from "../types/Language"

export const loadWordListFromServer = async (wordListName: string): Promise<APIWordList> => {
  const res = await fetch(`https://jpwords.blob.core.windows.net/word-lists/${wordListName}.json`)
  return await res.json() as APIWordList
}

export const convertAPIWordList = (apiWordList: APIWordList): WordListLoaded => {
  const wordCount = apiWordList.words.length
  return Object.assign(apiWordList, {wordCount, words: apiWordList.words.map(apiWord => convertAPIWord(apiWord)), language: apiWordList.language as Language})
}

export type WordListData = {
  [lang: string]: WordListSummary[]
}

export const loadWordListDataFromAzure = async (): Promise<WordListData> => {
  const res = await fetch("https://jpwords.blob.core.windows.net/word-lists/word_lists.json")
  const data = await res.json()
  return data as WordListData
}