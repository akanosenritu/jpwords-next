import React, {useContext} from "react"

// material-ui
import Box from "@material-ui/core/Box"
import CheckIcon from "@material-ui/icons/Check";
import Typography from "@material-ui/core/Typography";

import {useStyles} from "./Styles";
import {getColors} from "../Styles";
import {Word} from "../../../types/Word";
import {DisplayWordWithFurigana} from "../../DisplayWordWithFurigana";
import {LanguageContext} from "../../Providers/LanguageProvider";

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
  const language = useContext(LanguageContext)

  return <div style={{textAlign: "center", width:"100%"}}>
    <Box mt={4}>
      <Typography variant={"h4"}>{props.word.meaning[language]}</Typography>
    </Box>
    <Box mt={4} style={{minHeight: 50}}>
      <Typography variant={"h5"}><DisplayWordWithFurigana word={props.word} /></Typography>
    </Box>
    <Box mt={4}>
      <div className={styles.answerInputBox} style={{backgroundColor: backGround, borderColor: main}} key={`${props.word.meaning}`}>
        <input
          className={styles.answerInput} value={props.userInput} readOnly={true}
          autoFocus={true} onKeyPress={onKeyboardEvent2}
          key={props.word.meaning[language]}
        />
        <CheckIcon className={styles.answerInputIcon} />
      </div>
    </Box>
  </div>
}