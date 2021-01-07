import React from "react"

// material-ui
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Box from "@material-ui/core/Box"
import IconButton from '@material-ui/core/IconButton'
import SettingsIcon from '@material-ui/icons/Settings'
import Toolbar from '@material-ui/core/Toolbar'

// next
import {useRouter} from "next/router";

import {AccountPopOver} from "./AccountPopover";
import {MenuDrawer} from "./MenuDrawer";
import {routes} from "../../routes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    drawerList: {
      width: 250
    }
  }),
);

export const Navigation: React.FC = () => {
  const classes = useStyles()
  const route = useRouter()
  const onClickSettings = async () => {
    await route.push(routes.settings)
  }
  return <div className={classes.root}>
    <AppBar position="static" color={"primary"}>
      <Toolbar variant={"dense"} style={{display:"flex", justifyContent: "space-between", height: 20}}>
        <MenuDrawer />
        <Box>
          <IconButton color={"inherit"} onClick={onClickSettings}>
            <SettingsIcon />
          </IconButton>
          <AccountPopOver />
        </Box>
      </Toolbar>
    </AppBar>
  </div>
}