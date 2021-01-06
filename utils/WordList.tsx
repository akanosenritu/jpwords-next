import {WordListInitial} from "../types/WordList";
import {Language} from "../types/Language";
import wordListsData from "../data/wordLists/wordLists.json"

type WordListData = {
  [lang in Language]: any
}

const getWordListsData = () => {
  return wordListsData as WordListData
}

export const loadWordListVersion1 = (target: any): WordListInitial => {
  return {
    status: "initial" as const,
    name: target.name,
    uuid: target.uuid,
    language: target.language,
    version: target.version,
    description: target.description,
    wordUUIDs: target.words,
    wordCount: target.wordCount,
    wordsFiles: ["words.json"],
    hidden: target.hidden
  }
};

export const loadWordListVersion1FromFile = (targetFile: string): Promise<WordListInitial> => {
  return import(`../data/wordLists/${targetFile}`)
    .then(data => loadWordListVersion1(data))
}

export const loadWordListsForLanguage = async (language: Language): Promise<WordListInitial[]> => {
  return Promise.all(getWordListsData()[language].map((file: string) => loadWordListVersion1FromFile(file)))
}