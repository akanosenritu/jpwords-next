import {WordListLoaded} from "./WordList";
import {Word} from "./Word";

export type TrainerResult = {
  wordList: WordListLoaded,
  wordsDone: Word[],
  practiceQualities: number[]
}