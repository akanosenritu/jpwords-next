import * as uuid from "uuid"
import {
  APIPracticeHistory,
  PracticeHistory,
  PracticeHistoryV0,
  PracticeHistoryV1,
  PracticeHistoryV2,
  PracticeHistoryVLatest
} from "../types/PracticeHistory";
import {WordHistoryV3} from "../types/WordHistory";
import {loadPracticeHistoryFromLocalStorage, savePracticeHistoryLocally} from "./localStorage/PracticeHistory";
import {AuthenticatedUser, User} from "../types/User";
import {Failure, Success, unknownFailure} from "../types/Result";
import {get, post} from "./API"
import {WordListLoaded} from "../types/WordList";
import {Word} from "../types/Word";
import {shuffle} from "lodash"

type LoadPracticeHistoryNew = {
  status: "new",
  practiceHistory: PracticeHistoryVLatest
}
type LoadPracticeHistoryLoaded = {
  status: "loaded"
  practiceHistory: PracticeHistoryVLatest
}
type LoadPracticeHistoryConflict = {
  status: "conflict",
  localPracticeHistory: PracticeHistoryVLatest,
  remotePracticeHistory: PracticeHistoryVLatest
}
export type LoadPracticeHistoryResult =  LoadPracticeHistoryNew | LoadPracticeHistoryLoaded | LoadPracticeHistoryConflict

export const loadPracticeHistory = async (user: User): Promise<LoadPracticeHistoryResult> => {
  const loadFromLocalResult = loadPracticeHistoryFromLocalStorage(user)
  const retrievePracticeHistoryResult = await retrievePracticeHistory(user)
  if (retrievePracticeHistoryResult.status === "failure" ) {
    if (loadFromLocalResult.status === "failure") {
      console.log("a new practice history was created.")
      return {
        status: "new",
        practiceHistory: createBlankHistory()
      } as LoadPracticeHistoryNew
    } else {
      console.log("practice history was loaded from your browser.")
      return {
        status: "loaded",
        practiceHistory: loadFromLocalResult.practiceHistory
      } as LoadPracticeHistoryLoaded
    }
  } else {
    if (loadFromLocalResult.status === "failure"){
      console.log("practice history was loaded from the server.")
      return {
        status: "loaded",
        practiceHistory: retrievePracticeHistoryResult.practiceHistory
      } as LoadPracticeHistoryLoaded
    } else {
      console.log("there are two practice histories.")
      const arbitrate = (localHistory: PracticeHistoryVLatest, remoteHistory: PracticeHistoryVLatest) => {
        console.log(localHistory.hash, remoteHistory.hash)
        if (localHistory.hash === remoteHistory.hash) return localHistory
        return null
      }
      const arbitrationResult = arbitrate(loadFromLocalResult.practiceHistory, retrievePracticeHistoryResult.practiceHistory)
      if (arbitrationResult !== null) {
        return {
          status: "loaded",
          practiceHistory: arbitrationResult
        }
      }
      return {
        status: "conflict",
        localPracticeHistory: loadFromLocalResult.practiceHistory,
        remotePracticeHistory: retrievePracticeHistoryResult.practiceHistory
      } as LoadPracticeHistoryConflict
    }
  }
};

export const updatePracticeHistoryVersionFromV0toV1 = (oldPracticeHistory: PracticeHistoryV0): PracticeHistoryV1 => {
  return Object.assign({hash: uuid.v4()}, oldPracticeHistory, {version: "1.0" as const})
}
export const updatePracticeHistoryVersionFromV1toV2 = (oldPracticeHistory: PracticeHistoryV1): PracticeHistoryV2 => {
  const newWordsHistory: {[key: string]: WordHistoryV3} = {}
  for (const [wordUUID, wordHistory] of Object.entries(oldPracticeHistory.wordsHistory)) {
    newWordsHistory[wordUUID] = [wordHistory.nextPracticeDate, wordHistory.nPractices, wordHistory.strength]
  }
  return Object.assign(oldPracticeHistory, {wordsHistory: newWordsHistory, version: "2.0" as const})
}
export const updatePracticeHistoryVersion = (practiceHistory: PracticeHistory): PracticeHistoryVLatest => {
  switch(practiceHistory.version) {
    case "2.0":
      return practiceHistory
    case "1.0":
      return updatePracticeHistoryVersionFromV1toV2(practiceHistory)
    default:
      return updatePracticeHistoryVersionFromV1toV2(
        updatePracticeHistoryVersionFromV0toV1(practiceHistory)
      )
  }
}

type RetrievePracticeHistorySuccess = Success & {
  practiceHistory: PracticeHistoryVLatest
}
export type RetrievePracticeHistoryResult = RetrievePracticeHistorySuccess | Failure

export const retrievePracticeHistory = (user: User): Promise<RetrievePracticeHistoryResult> => {
  if (user.status === "Anonymous") {
    return Promise.resolve({
      status: "failure",
      reason: "No practice history saved in the server for an anonymous user."
    })
  }
  return get("practice-history/")
    .then(res => res.json())
    .then(data => {
      return data as APIPracticeHistory
    })
    .then(data => {
      const practiceHistory = updatePracticeHistoryVersion({
        userName: user.username,
        version: data.version.toString(),
        lastPracticeDate: data.last_update_date,
        wordsHistory: JSON.parse(data.data),
        hash: data.hash
      } as PracticeHistoryV1)
      return {
        status: "success",
        practiceHistory: practiceHistory
      } as RetrievePracticeHistorySuccess
    })
    .catch(() => {
      return unknownFailure
    })
}

export type SavePracticeHistoryRemotelyResult = Success | Failure

export const savePracticeHistoryRemotely = (practiceHistory: PracticeHistoryVLatest, user: AuthenticatedUser): Promise<SavePracticeHistoryRemotelyResult> => {
  if (practiceHistory.userName && user.username !== practiceHistory.userName) throw new Error("Cannot save practice history for a different user.")
  const postData: APIPracticeHistory = {
    last_update_date: practiceHistory.lastPracticeDate,
    version: practiceHistory.version,
    data: JSON.stringify(practiceHistory.wordsHistory),
    hash: practiceHistory.hash
  }
  return post("practice-history/", postData)
    .then(res => {
      if (res.ok) return {"status": "success"}
      return {
        status: "failure",
        reason: res.statusText
      }
    })
}

export const createBlankHistory: () => PracticeHistoryVLatest = () => {
  return {
    lastPracticeDate: new Date().toISOString(),
    version: "2.0",
    wordsHistory: {},
    hash: uuid.v4()
  } as PracticeHistoryV2
};

type CalculateProgressForWordListResult = {
  countReviewed: number,
  countNeedsReview: number,
  countUntouched: number,
  progress: number
}

export const calculateProgressForWordList = (practiceHistory: PracticeHistoryVLatest, wordList: WordListLoaded): CalculateProgressForWordListResult => {
  let countReviewed = 0;
  let countNeedsReview = 0;
  let countUntouched = 0;
  for (let word of wordList.words) {
    // @ts-ignore
    const wordHistory = practiceHistory.wordsHistory[word.uuid];
    if (wordHistory === undefined) {
      countUntouched += 1
      continue
    }
    if (wordHistory[1] === 0) {
      countUntouched += 1
      continue
    }
    const nextPracticeDate = new Date(wordHistory[0]);
    if (nextPracticeDate.getTime() - Date.now() > 0) {
      countReviewed += 1
    } else {
      countNeedsReview += 1
    }
  }
  const progress = 100 * (countNeedsReview + countReviewed) / wordList.wordCount;
  return {
    countReviewed,
    countNeedsReview,
    countUntouched,
    progress
  }
}

export const savePracticeHistory = (practiceHistory: PracticeHistoryVLatest, user: User) => {
  practiceHistory.hash = uuid.v4()
  savePracticeHistoryLocally(practiceHistory)
  if (user.status === "Authenticated") {
    savePracticeHistoryRemotely(practiceHistory, user)
  }
};

const TIME_FACTOR = 24 * 60 * 60 * 1000;

export const updatePracticeHistoryWithPracticeResult = (practiceHistory: PracticeHistoryVLatest, wordIdsPracticed: string[], practiceQualities: number[]) => {
  const calculateNextPracticeDate = (strength: number, nPractices: number, timeFactor: number): Date => {
    const l = [] as number[];
    l[1] = 1;
    l[2] = 6;
    for (let i=3; i<=nPractices; i++) {
      l[i] = l[i-1] * strength;
    }
    return new Date(Date.now() + timeFactor * l[nPractices]);
  };
  const calculateStrength = (strengthBefore: number, practiceQuality: number) => {
    let newStrength = strengthBefore + (0.1  - (5 - practiceQuality) * (0.08 + (5 - practiceQuality) * 0.02));
    if (newStrength < 1.3) newStrength = 1.3;
    if (newStrength > 2.5) newStrength = 2.5;
    return newStrength;
  }
  let updatedWordsHistory = practiceHistory.wordsHistory;
  wordIdsPracticed.forEach((wordIdPracticed, index) => {
    const practiceQuality = practiceQualities[index];
    if (updatedWordsHistory[wordIdPracticed] !== undefined) {
      updatedWordsHistory[wordIdPracticed][1] += 1
      let newStrength = calculateStrength(updatedWordsHistory[wordIdPracticed][2], practiceQuality);
      if (newStrength < 0) newStrength = 0;
      updatedWordsHistory[wordIdPracticed][2] = newStrength;
      updatedWordsHistory[wordIdPracticed][0] = calculateNextPracticeDate(newStrength, updatedWordsHistory[wordIdPracticed][1], TIME_FACTOR).toISOString();
    } else {
      const strength = calculateStrength(2.5, practiceQuality);
      updatedWordsHistory[wordIdPracticed] = [
        calculateNextPracticeDate(strength, 1, TIME_FACTOR).toISOString(),
        1,
        strength
      ]
    }
  })
  const newHistory = practiceHistory;
  newHistory.wordsHistory = updatedWordsHistory;
  newHistory.lastPracticeDate = new Date().toISOString();
  return newHistory;
};

export const chooseWordsToPractice = (wordList: WordListLoaded, practiceHistory: PracticeHistoryVLatest, quantity: number): Word[] => {
  const words = shuffle(wordList.words);
  const untouchedWords = [] as Word[];
  const result = [] as Word[];
  for (let word of words) {
    const wordId = word.uuid;
    const wordHistory = practiceHistory.wordsHistory[wordId];
    if (wordHistory === undefined) {
      untouchedWords.push(word);
      continue
    }
    const nextPracticeDate = new Date(wordHistory[0]);
    if (wordHistory[1] === 0) {
      untouchedWords.push(word);
      continue;
    } else if ((nextPracticeDate.getTime() - Date.now()) < 0) {
      result.push(word);
    }

    if (result.length === (quantity - 4)) {
      break
    }
  }
  return result.concat(untouchedWords.slice(0, 20)).slice(0, 20);
};