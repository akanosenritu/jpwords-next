import React, {useContext, useState} from "react";
import {WordListLoaded} from "../../types/WordList";
import {PracticeHistoryContext} from "../Providers/PracticeHistoryProvider";
import {PracticeWordListViewResult} from "./PracticeWordListViewResult";
import {TrainerResult} from "../../types/TrainerResult";
import {updatePracticeHistoryWithPracticeResult} from "../../utils/PracticeHistory";
import {PracticeWordListViewDoPractice} from "./PracticeWordListViewDoPractice";
import {Language} from "../../types/Language";
import {LanguageProvider} from "../Providers/LanguageProvider";

type PracticeWordListViewState = "practice" | "result"

type Props = {
  wordList: WordListLoaded,
  language: Language
}

const PracticeWordList: React.FC<Props> = (props) => {
  const [currentState, setCurrentState] = useState<PracticeWordListViewState>("result");
  const {practiceHistory, updatePracticeHistory} = useContext(PracticeHistoryContext)
  // @ts-ignore
  const finishPractice = (practiceResult: TrainerResult) => {
    updatePracticeHistory(updatePracticeHistoryWithPracticeResult(practiceHistory, practiceResult.wordsDone.map(word => word.uuid), practiceResult.practiceQualities))
    setCurrentState("result");
  };
  const continuePractice = () => {
    setCurrentState("practice");
  };
  return <LanguageProvider language={props.language}>
    <div style={{minWidth: 320, maxWidth: 500, margin: "auto", position: "relative"}}>
      {practiceHistory ?
        <>
          {currentState === "practice" &&
          <PracticeWordListViewDoPractice wordListToPractice={props.wordList} finishPractice={finishPractice}/>}
          {currentState === "result" &&
          <PracticeWordListViewResult wordList={props.wordList} continuePractice={continuePractice}/>}
        </> :
        <div>Loading...</div>
      }
    </div>
  </LanguageProvider>
};

export default PracticeWordList