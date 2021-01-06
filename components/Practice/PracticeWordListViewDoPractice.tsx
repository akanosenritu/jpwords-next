import React, {useContext} from "react";
import {Trainer2} from "./Trainer";
import {shuffle} from "lodash";
import {Word} from "../../types/Word";
import {WordListLoaded} from "../../types/WordList";
import {TrainerResult} from "../../types/TrainerResult";
import {chooseWordsToPractice} from "../../utils/PracticeHistory";
import {PracticeHistoryContext} from "../Providers/PracticeHistoryProvider";

type PracticeWordListViewDoPracticeProps = {
    wordListToPractice: WordListLoaded,
    finishPractice: (practiceResult: TrainerResult) => void;
}

export const PracticeWordListViewDoPractice: React.FC<PracticeWordListViewDoPracticeProps> = (props) => {
  const {practiceHistory} = useContext(PracticeHistoryContext)
  const words = shuffle(chooseWordsToPractice(props.wordListToPractice, practiceHistory, 20));
  const finishPractice = (wordsDone: Word[], practiceQualities: number[]) => {
    const practiceResult = {
      wordList: props.wordListToPractice,
      wordsDone: wordsDone,
      practiceQualities: practiceQualities
    };
    props.finishPractice(practiceResult);
  };
  return <Trainer2 words={words} reversed={false} finishPractice={finishPractice}/>
};