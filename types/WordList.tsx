import {Language} from "./Language";
import {Word} from "./Word";

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
  status: "loaded",
  name: string,
  uuid: string,
  language: Language,
  words: Word[],
  version: number,
  description: string,
  wordCount: number,
  wordsFiles: string[],
  hidden: boolean,
}