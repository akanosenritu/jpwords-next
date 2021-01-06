import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "./UserProvider";
import {PracticeHistoryVLatest} from "../../types/PracticeHistory";
import {createBlankHistory, loadPracticeHistory, savePracticeHistory} from "../../utils/PracticeHistory";
import {PracticeHistoryArbitrator} from "../Dialogs/PracticeHistoryArbitrator";

type PracticeHistoryProviderValue = {
  practiceHistory: PracticeHistoryVLatest,
  updatePracticeHistory: (practiceHistory: PracticeHistoryVLatest) => void
}

const defaultPracticeHistoryProviderValue: PracticeHistoryProviderValue = {
  practiceHistory: createBlankHistory(),
  updatePracticeHistory: () => {}
}

export const PracticeHistoryContext = React.createContext(defaultPracticeHistoryProviderValue)

export const PracticeHistoryProvider: React.FC = props => {
  const {user} = useContext(UserContext)
  const [practiceHistory, setPracticeHistory] = useState<PracticeHistoryVLatest>(createBlankHistory())
  const updatePracticeHistory = (practiceHistory: PracticeHistoryVLatest) => {
    savePracticeHistory(practiceHistory, user)
    setPracticeHistory(practiceHistory)
  }
  const [arbitrator, setArbitrator] = useState<JSX.Element|null>(null)
  useEffect(() => {
    const onArbitrated = (practiceHistory: PracticeHistoryVLatest) => {
      savePracticeHistory(practiceHistory, user)
      setPracticeHistory(practiceHistory)
      setArbitrator(null)
    }
    loadPracticeHistory(user)
      .then(result => {
        switch(result.status) {
          case "new":
          case "loaded":
            setPracticeHistory(result.practiceHistory)
            break
          case "conflict":
            setArbitrator(<PracticeHistoryArbitrator localHistory={result.localPracticeHistory} remoteHistory={result.remotePracticeHistory} onArbitrated={onArbitrated} />)
        }
      })
  }, [user])
  return <PracticeHistoryContext.Provider value={{practiceHistory, updatePracticeHistory}}>
    {props.children}
    {arbitrator}
  </PracticeHistoryContext.Provider>
}
