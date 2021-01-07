import React from "react";
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography";

export const H4: React.FC = props => {
  return <Typography variant={"h4"}>
    {props.children}
  </Typography>
}

export const H5: React.FC = props => {
  return <Box style={{paddingBottom: 10}}>
    <Box style={{borderLeft: "8px solid lightgray", paddingLeft: 7}}>
      <Typography variant={"h5"}>{props.children}</Typography>
    </Box>
  </Box>
}

export const H6: React.FC = props => {
  return <Box style={{paddingBottom: 10}}>
    <Box style={{borderLeft: "3px solid lightgray", paddingLeft: 2}}>
      <Box style={{borderLeft: "3px solid lightgray", paddingLeft: 7}}>
        <Typography variant={"h6"}>{props.children}</Typography>
      </Box>
    </Box>
  </Box>
}