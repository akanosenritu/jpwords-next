import {WordHistoryV2, WordHistoryV3} from "./WordHistory";

export type PracticeHistoryV0 = {
  lastPracticeDate: string,
  wordsHistory: {[key: string]: WordHistoryV2},
  userName?: string,
  version: number,
}

export type PracticeHistoryV1 = {
  lastPracticeDate: string,
  wordsHistory: {[key: string]: WordHistoryV2},
  userName?: string,
  version: "1.0",
  hash: string
}

export type PracticeHistoryV2 = {
  lastPracticeDate: string,
  wordsHistory: {[key: string]: WordHistoryV3},
  userName?: string,
  version: "2.0",
  hash: string
}

export type PracticeHistory = PracticeHistoryV0 | PracticeHistoryV1 | PracticeHistoryV2

export type PracticeHistoryVLatest = PracticeHistoryV2

export type APIPracticeHistory = {
  last_update_date: string,
  version: number | string,
  data: string,
  hash: string
}