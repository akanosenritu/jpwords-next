import {Language} from "./Language";
import {WordNote} from "./WordNote";

export type Word = {
  uuid: string,
  kanji: string,
  kana: string,
  category: string[],
  meaning: {[lang in Language]: string},
  associatedWordNotes?: WordNote[]
}
