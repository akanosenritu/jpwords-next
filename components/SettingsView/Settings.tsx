import React, {ChangeEvent, useContext, useState} from "react";

// material-ui
import Box from "@material-ui/core/Box"
import Tab from "@material-ui/core/Tab"
import Tabs from "@material-ui/core/Tabs"
import Typography from "@material-ui/core/Typography"

// tabs
import {AccountSettingsTab} from "./AccountSettingsTab"
import {LanguageSettingsTab} from "./LanguageSettingsTab"
import {PracticeSettingsTab} from "./PracticeSettingsTab"

import {UserContext} from "../Providers/UserProvider";
import {Paragraph} from "../Paragraph";

type TabPanelProps = {
  value: any,
  index: any,
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

export const Settings: React.FC = () => {
  const {user} = useContext(UserContext)
  const [tabIndex, setTabIndex] = useState(0)
  const handleTabChange = (event: ChangeEvent<{}>, newTabIndex: any) => {
    event
    setTabIndex(newTabIndex)
  }
  return <div style={{minWidth: 320, maxWidth: 500, margin: "auto", position:"relative"}}>
    <Box mt={2}>
      <Box style={{textAlign: "center"}} m={2}>
        <Typography variant={"h5"}>Settings</Typography>
      </Box>
      <Tabs
        centered={true}
        indicatorColor={"primary"}
        onChange={handleTabChange}
        value={tabIndex}
      >
        <Tab label={"Account"} />
        <Tab label={"Language"} />
        <Tab label={"PracticeView"} />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        {user.status === "Authenticated"?
          <AccountSettingsTab />:
          <p>Authenticated User Only</p>
        }
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <LanguageSettingsTab />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <PracticeSettingsTab />
      </TabPanel>
      <Paragraph>
        * Note that this setting will be saved in your browser, not in the server.
      </Paragraph>
    </Box>
  </div>
}