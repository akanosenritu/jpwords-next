import React, {useState} from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import {useRouter} from "next/router";

export const MenuDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const movePage = async (destination: string) => {
    await router.push(destination)
  }

  return <>
    <IconButton edge={"start"} color={"inherit"} aria-label={"menu"} onClick={()=>setIsOpen(true)}>
      <MenuIcon />
    </IconButton>
    <Drawer
      anchor={"left"}
      open={isOpen}
      onClose={()=>setIsOpen(false)}
    >
      <List>
        <ListItem button key={"vocabulary"} onClick={()=>movePage("/practice/vocabulary/")}>
          <ListItemText primary={"Vocabulary"}/>
        </ListItem>
      </List>
    </Drawer>
  </>
}