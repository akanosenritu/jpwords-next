import React, {useState} from "react"
import Popover from "@material-ui/core/Popover";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import IconButton from "@material-ui/core/IconButton";
import {AccountPopOverContent} from "./AccountPopOverContent";

export const AccountPopOver: React.FC = () => {
  const [anchorEL, setAnchorEL] = useState<HTMLElement|null>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEL(event.currentTarget)
  }
  const handleClose = () => setAnchorEL(null)
  const isOpen = !!anchorEL
  return <div style={{display: "inline"}}>
    <IconButton onClick={handleClick} color={"inherit"}>
      <AccountBoxIcon />
    </IconButton>
    <Popover
      anchorEl={anchorEL}
      anchorOrigin={{vertical: "bottom", horizontal: "left"}}
      open={isOpen}
      onClose={handleClose}
    >
      <AccountPopOverContent />
    </Popover>
  </div>
}
