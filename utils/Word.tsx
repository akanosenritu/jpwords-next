import {APIWord, Word} from "../types/Word";
import {Language, languages} from "../types/Language";

export const convertAPIWord = (apiWord: APIWord): Word => {
  const meaningTranslations = apiWord.meaning
  const meaning = languages
    .reduce((acc, val) => ({...acc, [val]: ""}), {} as {[lang in Language]: string})
  for (const translation of meaningTranslations) {
    meaning[translation.language] = translation.text
  }
  return Object.assign(apiWord, {"meaning": meaning})
}

const isAnswerCorrectWithKana = (word: Word, answer: string): boolean => {
  if (!word.kana) return false
  if (word.kana.replace("～", "") === answer) return true
  return !!word.kana && word.kana === answer
}

const isAnswerCorrectWithKanji = (word: Word, answer: string): boolean => {
  if (!word.kanji) return false
  if (word.kanji.replace("～", "") === answer) return true
  return !!word.kanji && word.kanji === answer
}

type answerEvaluationResultType = "CORRECT" | "WRONG"

export const evaluateAnswer = (word: Word, answer: string, rejectKana?: boolean): answerEvaluationResultType => {
  if (!rejectKana && isAnswerCorrectWithKana(word, answer)) return "CORRECT"
  return isAnswerCorrectWithKanji(word, answer)? "CORRECT": "WRONG"
}