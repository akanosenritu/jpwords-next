import {Language} from "./Language";
import {APIWord, Word} from "./Word";

export type WordListSummary = {
  name: string,
  uuid: string,
  description: string,
  wordCount: number,
}

export type WordListLoaded = {
  uuid: string,
  name: string,
  language: Language,
  words: Word[],
  description: string,
  wordCount: number,
}

export type APIWordList = {
  uuid: string,
  name: string,
  language: string,
  words: APIWord[],
  description: string
}