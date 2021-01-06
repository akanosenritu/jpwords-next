import React, {useState} from "react";
import {Try} from "./Try";
import {Final} from "./Final";
import {Word} from "../../../types/Word";
import {initialConfigurations, useConfigurations} from "../../../utils/localStorage/Configurations";

type PracticeWithInputProps = {
  word: Word,
  onNext: (wasCorrect: boolean) => void,
}

type PracticeWithInputStatusType = "FIRST" | "SECOND" | "SUCCESS" | "FAIL"

export const PracticeWordWithInput: React.FC<PracticeWithInputProps> = (props) => {
  const {configurations} = useConfigurations(initialConfigurations);
  const [status, setStatus] = useState<PracticeWithInputStatusType>("FIRST")
  const [userInput, setUserInput] = useState<string>("")
  return <>
    {status === "FIRST" &&
      <Try
        word={props.word}
        onCorrectAnswer={(userInput) => {
          setUserInput(userInput)
          setStatus("SUCCESS")
        }}
        onWrongAnswer={(userInput) => {
          setUserInput(userInput)
          setStatus("SECOND")
        }}
        isHardMode={configurations.hardMode}
        isSecond={false}
        previousUserInput={""}
      />
    }
    {status === "SECOND" &&
    <Try
      word={props.word}
      onCorrectAnswer={(userInput) => {
        setUserInput(userInput)
        setStatus("FAIL")
      }}
      onWrongAnswer={() => {
        props.onNext(false)
      }}
      isHardMode={configurations.hardMode}
      isSecond={true}
      previousUserInput={userInput}
    />
    }
    {status === "SUCCESS" &&
      <Final
        word={props.word}
        userInput={userInput}
        onNext={()=>props.onNext(true)}
      />
    }
    {status === "FAIL" &&
      <Final
        word={props.word}
        userInput={userInput}
        onNext={()=>props.onNext(false)}
      />
    }
  </>
}