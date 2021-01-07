import React from "react"
import {GetStaticPaths, GetStaticProps} from "next"
import {convertAPIWordList, loadWordListDataFromAzure, loadWordListFromServer} from "../../../../utils/WordList"
import {Language} from "../../../../types/Language"
import {WordListLoaded} from "../../../../types/WordList"
import Layout from "../../../../components/Layout"
import PracticeWordList from "../../../../components/PracticeView/PracticeWordList"
import useTranslation from "next-translate/useTranslation"

export const getStaticPaths: GetStaticPaths = async ({locales}) => {
  if (!locales) return {paths: [], fallback: false}
  const data = await loadWordListDataFromAzure()
  const paths = locales.map(locale => {
    if (!data[locale]) return []
    return data[locale].map(wordListSummary => wordListSummary.name)
      .map(name => ({params: {name, locale}}))
  }).reduce((acc, val) => acc.concat(val))
  return {paths, fallback: false}
}

export const getStaticProps: GetStaticProps = async ({params, locale}) => {
  if (!params || !locale) return {props: {}}
  if (typeof params.name !== "string") return {props: {}}
  const name = params.name
  const language = locale as Language
  const wordList = await loadWordListFromServer(name)
  return {
    props: {
      wordList: convertAPIWordList(wordList),
      language
    }
  }
}

type Props = {
  wordList: WordListLoaded,
  language: Language
}

const Page: React.FC<Props> = props => {
  const {t} = useTranslation("common")
  return <Layout title={t("Practice - NAME wordlist", {name: props.wordList.name})}>
    <PracticeWordList wordList={props.wordList} language={props.language} />
  </Layout>
}

export default Page
