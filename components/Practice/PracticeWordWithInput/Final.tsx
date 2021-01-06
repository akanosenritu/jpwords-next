import React from "react"
import {Box, Typography} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import {useStyles} from "./Styles";
import {getColors} from "../Styles";
import {Word} from "../../../types/Word";
import {initialConfigurations, useConfigurations} from "../../../utils/localStorage/Configurations";
import {DisplayWordWithFurigana} from "../../DisplayWordWithFurigana";

type FinalProps = {
  word: Word,
  userInput: string,
  onNext: () => void,
}

export const Final: React.FC<FinalProps> = props => {
  const styles = useStyles();
  const {main, backGround} = getColors("CORRECT")
  const onKeyboardEvent2 = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      props.onNext()
    }
  }
  const {configurations} = useConfigurations(initialConfigurations)
  return <div style={{textAlign: "center", width:"100%"}}>
    <Box mt={4}>
      <Typography variant={"h4"}>{props.word.meaning[configurations.language]}</Typography>
    </Box>
    <Box mt={4} style={{minHeight: 50}}>
      <Typography variant={"h5"}><DisplayWordWithFurigana word={props.word} /></Typography>
    </Box>
    <Box mt={4}>
      <div className={styles.answerInputBox} style={{backgroundColor: backGround, borderColor: main}} key={`${props.word.meaning}`}>
        <input
          className={styles.answerInput} value={props.userInput} readOnly={true}
          autoFocus={true} onKeyPress={onKeyboardEvent2}
          key={props.word.meaning[configurations.language]}
        />
        <CheckIcon className={styles.answerInputIcon} />
      </div>
    </Box>
  </div>
}