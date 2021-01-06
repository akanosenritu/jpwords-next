import {Failure, Success} from "../../types/Result";
import {PracticeHistory, PracticeHistoryVLatest} from "../../types/PracticeHistory";
import {User} from "../../types/User";
import {updatePracticeHistoryVersion} from "../PracticeHistory";

const LOCAL_STORAGE_KEY_NAME = "practiceHistory"

type LoadPracticeHistorySuccess = Success & {
  practiceHistory: PracticeHistoryVLatest
}
export type LoadPracticeHistoryFromLocalStorageResult = LoadPracticeHistorySuccess | Failure

export const loadPracticeHistoryFromLocalStorage = (user: User): LoadPracticeHistoryFromLocalStorageResult => {
  const localStorage = window.localStorage;
  const possibleHistory = localStorage.getItem(LOCAL_STORAGE_KEY_NAME);
  if (possibleHistory) {
    const history = JSON.parse(possibleHistory) as PracticeHistory;
    if (user.status === "Authenticated") {
      if (user.username && history.userName && user.username !== history.userName) {
        return {
          status: "failure",
          reason: "practice history was found, but it was for a different user."
        }
      }
    }
    return {
      status: "success",
      practiceHistory: updatePracticeHistoryVersion(history)
    }
  }
  return {
    status: "failure",
    reason: "No practice history was found."
  }
};

export const savePracticeHistoryLocally = (practiceHistory: PracticeHistoryVLatest) => {
  const localStorage = window.localStorage;
  localStorage.setItem(LOCAL_STORAGE_KEY_NAME, JSON.stringify(practiceHistory));
};