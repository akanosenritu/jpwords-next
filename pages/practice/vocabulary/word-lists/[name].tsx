import fetch from "node-fetch"
import {GetStaticPaths, GetStaticProps} from "next";
import {convertAPIWordList, loadWordListFromServer} from "../../../../utils/WordList";
import React, {useContext, useState} from "react";
import {WordListLoaded} from "../../../../types/WordList";
import {PracticeHistoryContext} from "../../../../components/Providers/PracticeHistoryProvider";
import {PracticeWordListViewResult} from "../../../../components/Practice/PracticeWordListViewResult";
import {TrainerResult} from "../../../../types/TrainerResult";
import {updatePracticeHistoryWithPracticeResult} from "../../../../utils/PracticeHistory";
import {PracticeWordListViewDoPractice} from "../../../../components/Practice/PracticeWordListViewDoPractice";

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://jpwords.blob.core.windows.net/word-lists/word_lists.json")
  const wordLists = await res.json() as any
  const paths = wordLists.names.map((name: any) => `/practice/vocabulary/word-lists/${name}`)
  return {paths, fallback: false}
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  if (!params || typeof params.name !== "string") return {props: {}}
  const name = params.name
  const wordList = await loadWordListFromServer(name)
  return {
    props: {wordList: convertAPIWordList(wordList)}
  }
}

type PracticeWordListViewState = "practice" | "result"

type Props = {
  wordList: WordListLoaded
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
  return <div style={{minWidth: 320, maxWidth: 500, margin: "auto", position:"relative"}}>
    {practiceHistory?
      <>
        {currentState === "practice" && <PracticeWordListViewDoPractice wordListToPractice={props.wordList} finishPractice={finishPractice}/>}
        {currentState === "result" && <PracticeWordListViewResult wordList={props.wordList} continuePractice={continuePractice}/>}
      </>:
      <div>Loading...</div>
    }
  </div>
};

export default PracticeWordList