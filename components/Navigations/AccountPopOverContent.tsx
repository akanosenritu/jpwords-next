import React, {useState} from "react"
import Box from "@material-ui/core/Box"
import Dialog from "@material-ui/core/Dialog"
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {LoginDialog} from "../User/LoginDialog";
import {SignUpDialog} from "../User/SignUpDialog";

export const AccountPopOverContent: React.FC = () => {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
  const [isSignUpDialogOpen, setIsSignUpDialogOpen] = useState(false)

  return <Box>
    <List component={"nav"} aria-label={"login signup account"}>
      <ListItem button onClick={()=>setIsLoginDialogOpen(true)}>
        <ListItemText primary={"Login"} />
      </ListItem>
      <ListItem button onClick={()=>setIsSignUpDialogOpen(true)}>
        <ListItemText primary={"SignUp"} />
      </ListItem>
    </List>
    <Dialog open={isLoginDialogOpen} onClose={()=>setIsLoginDialogOpen(false)}>
      <LoginDialog close={()=>setIsLoginDialogOpen(false)}/>
    </Dialog>
    <Dialog open={isSignUpDialogOpen} onClose={()=>setIsSignUpDialogOpen(false)}>
      <SignUpDialog close={()=>setIsSignUpDialogOpen(false)}/>
    </Dialog>
  </Box>
}