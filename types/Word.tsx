import {Language} from "./Language";
import {WordNote} from "./WordNote";
import {APITranslation} from "./Translation";

export type Word = {
  uuid: string,
  kanji: string,
  kana: string,
  category: string[],
  meaning: {[lang in Language]: string},
  associatedWordNotes?: WordNote[]
}

export type APIWord = {
  uuid: string,
  kanji: string,
  kana: string,
  category: string[]
  meaning: APITranslation[]
}
