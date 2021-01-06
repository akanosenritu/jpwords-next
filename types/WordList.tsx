import {Language} from "./Language";
import {APIWord, Word} from "./Word";

export type WordListInitial = {
  status: "initial",
  name: string,
  uuid: string,
  language: Language,
  version: number,
  description: string,
  wordUUIDs: string[],
  wordCount: number,
  wordsFiles: string[]
  hidden: boolean,
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