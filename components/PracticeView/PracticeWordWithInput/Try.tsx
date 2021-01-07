import React, {useContext} from "react"

// material-ui
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"

import * as wanakana from "wanakana"
import {Word} from "../../../types/Word"
import {getColors} from "../Styles"
import {useStyles} from "./Styles"
import {DisplayWordWithFurigana} from "../../DisplayWordWithFurigana"
import {PracticeInput} from "./PracticeInput"
import {evaluateAnswer} from "../../../utils/Word"
import {LanguageContext} from "../../Providers/LanguageProvider"

type TryProps = {
  word: Word,
  previousUserInput: string,
  onCorrectAnswer: (userInput: string) => void,
  onWrongAnswer: (userInput: string) => void,
  isHardMode: boolean,
  isSecond: boolean
}

export const Try: React.FC<TryProps> = props => {
  const styles = useStyles();
  const {main, backGround} = getColors("WRONG")
  const evaluate = (userInput: string) => {
    const evaluation = evaluateAnswer(props.word, userInput, props.isHardMode);
    return evaluation === "CORRECT";
  }
  const language = useContext(LanguageContext)

  return <div style={{textAlign: "center", width:"100%"}}>
    <Box mt={4}>
      <Typography variant={"h4"}>{props.word.meaning[language]}</Typography>
    </Box>
    <Box mt={4} style={{minHeight: 50}}>
      {props.isSecond && <Typography variant={"h5"}><DisplayWordWithFurigana word={props.word} /></Typography>}
    </Box>
    <Box mt={4}>
      <div
        className={styles.answerInputBox} key={props.word.meaning[language]}
        style={{backgroundColor: props.isSecond? backGround: "", borderColor: props.isSecond? main: ""}}
      >
        <PracticeInput
          placeholder={`translate ${props.word.meaning[language]}`}
          evaluateAnswer={evaluate}
          isKatakana={wanakana.isKatakana(props.word.kana)}
          isHardMode={props.isHardMode}
          onCorrectAnswer={props.onCorrectAnswer}
          onWrongAnswer={props.onWrongAnswer}
          previousUserInput={props.previousUserInput}
        />
      </div>
    </Box>
  </div>
}