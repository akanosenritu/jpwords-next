import React from "react"
import Layout from "../../../components/Layout"
import {DisplayWordNote} from "../../../components/DisplayWordNotes"

const Page: React.FC = () => {
  const wordNote = {
    "uuid": "98f2022e-e47a-4d0e-94aa-43f876613621",
    "title": "Tomorrow",
    "associated_words": [
      "527a1ca1-c5ca-4d05-8d70-ad077eadaf45",
      "f0916aae-9810-4201-8b05-13f5efd1f043"
    ],
    "associated_categories": [],
    "is_published": false
  }
  return <Layout>
    <DisplayWordNote wordNote={wordNote} />
  </Layout>
}

export default Page