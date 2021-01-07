import React from "react"
import {GetStaticProps} from "next"
import {loadWordListDataFromAzure} from "../../../utils/WordList"
import {WordListSummary} from "../../../types/WordList"
import Layout from "../../../components/Layout"
import useTranslation from "next-translate/useTranslation"
import {PracticeWordListViewOverview} from "../../../components/PracticeView/Vocabulary/PracticeWordListViewOverview"

export const getStaticProps: GetStaticProps = async ({locale}) => {
  if (!locale) return {props: {}}
  const data = await loadWordListDataFromAzure()
  if (!data[locale]) return {props: {}}
  const wordLists = data[locale]
  return {
    props: {
      wordLists
    }
  }
}

type Props = {
  wordLists: WordListSummary[]
}

const Page: React.FC<Props> = props => {
  const {t} = useTranslation("common")
  return <Layout title={t("Practice vocabulary")}>
    <PracticeWordListViewOverview wordLists={props.wordLists} />
  </Layout>
}

export default Page