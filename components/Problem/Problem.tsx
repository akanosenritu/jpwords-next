import React, {useContext, useState} from "react";
import {HiddenContext} from "./HiddenContext";
import {UserInteractionContext} from "./UserInteractionContext";

type ProblemProps = {
  answer: string,
  otherPossibleAnswers?: string[],
  dummies?: string[],
  translation?: string,
  rationale?: React.ReactElement
}

export const Problem: React.FC<ProblemProps> = props => {
  const [isHidden, setIsHidden] = useState(true)
  const UserInteraction = useContext(UserInteractionContext)
  return <HiddenContext.Provider value={isHidden}>
    <p>{props.children}</p>
    {props.translation && <p style={{marginLeft: 10, fontSize: "1rem"}}>{props.translation}</p>}
    <UserInteraction
      answer={props.answer}
      onCorrectlyAnswered={()=>setIsHidden(false)}
      onWronglyAnswered={()=>setIsHidden(false)}
      isAnswered={!isHidden}
      dummies={props.dummies}
      otherPossibleAnswers={props.otherPossibleAnswers}
    />
    {props.rationale && !isHidden &&
    <p style={{marginLeft: 10, fontSize: "1rem", border: "1px solid lightgray", borderRadius: 10, padding: 4, backgroundColor: "#ebfaeb"}} >{props.rationale}</p>
    }
  </HiddenContext.Provider>
}
