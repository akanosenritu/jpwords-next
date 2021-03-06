import React from "react"

// material-ui
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import makeStyles from "@material-ui/core/styles/makeStyles"

// next
import {useRouter} from "next/router"

import {WordListSummary} from "../../../types/WordList"
import {routes} from "../../../routes";

const usePracticeViewStyles = makeStyles({
  startPractice: {
    border: "1px black solid",
    borderRadius: "5px / 5px",
    textAlign: "center",
    width: "90%"
  },
  startPracticeWordListCard: {
    minWidth: 275,
    textAlign: "left",
    backgroundColor: "#f2f2f2"
  },
})

type StartPracticeByWordListCardProps = {
  wordList: WordListSummary,
}

const StartPracticeByWordListCard: React.FC<StartPracticeByWordListCardProps> = (props) => {
  const classes = usePracticeViewStyles()
  const router = useRouter()

  const onClickStart = async () => {
    await router.push(routes.practiceVocabularyWordList(props.wordList.name))
  };

  return <Card className={classes.startPracticeWordListCard} variant={"outlined"}>
    <CardContent>
      <Typography variant={"h6"}>{props.wordList.name} ({props.wordList.wordCount} words)</Typography>
      <Typography variant={"body1"}>{props.wordList.description}</Typography>
    </CardContent>
    <CardActions style={{justifyContent: "center"}}>
      <Button variant={"contained"} size={"small"} color={"primary"} onClick={onClickStart}>
        Start
      </Button>
    </CardActions>
  </Card>
};

type StartPracticeByWordListProps = {
  wordLists: WordListSummary[]
}

const StartPracticeByWordList: React.FC<StartPracticeByWordListProps> = (props) => {
  return <Box mt={2} p={1}>e
    <Box style={{borderLeft: "2px solid lightgray", paddingLeft: 10}}>
      <Typography variant={"h6"}>General Word Lists</Typography>
    </Box>
    <Box mt={2}>
      {props.wordLists.length > 0? props.wordLists.map(wordList => {
        return <StartPracticeByWordListCard wordList={wordList} key={`${wordList.uuid}`} />
      }): "No available list."}
    </Box>
  </Box>
};

type PracticeWordListViewOverviewProps = {
  wordLists: WordListSummary[]
}

export const PracticeWordListViewOverview: React.FC<PracticeWordListViewOverviewProps> = (props) => {
  return <Box mt={2} p={1} style={{minWidth: 320, maxWidth: 500, margin: "auto", position:"relative"}}>
    <StartPracticeByWordList wordLists={props.wordLists} />
  </Box>
};
