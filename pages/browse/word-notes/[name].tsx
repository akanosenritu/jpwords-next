import React from "react"
import {GetStaticPaths, GetStaticProps} from "next"
import {wordNoteContentMDXComponents} from "../../../components/Providers/WordNoteMDXProvider"
import renderToString from "next-mdx-remote/render-to-string"
import hydrate from "next-mdx-remote/hydrate"
import {loadWordNoteContentFromAzure, loadWordNoteDataFromAzure} from "../../../utils/WordNote"
import {ParsedUrlQuery} from "querystring"
import {Language} from "../../../types/Language"

export const getStaticPaths: GetStaticPaths = async ({locales}) => {
  if (!locales) return {paths: [], fallback: false}
  let paths: {params: ParsedUrlQuery, locale: string}[] = []
  const data = await loadWordNoteDataFromAzure()
  for (const locale of locales) {
    const wordNotes = data.wordNotes.filter(wordNote => wordNote.contents.hasOwnProperty(locale))
    paths = paths.concat(
      wordNotes
        .map(wordNote => wordNote.uuid)
        .map(uuid => ({params: {name: uuid}, locale}))
    )
  }
  return {paths, fallback: false}
}

export const getStaticProps: GetStaticProps = async ({locale, params}) => {
  if (!locale || !params || !params.name || typeof params.name !== "string") return {notFound: true}
  const data = await loadWordNoteDataFromAzure()
  const wordNoteDatum = data.wordNotes.find(wordNote => wordNote.uuid === params.name)
  if (!wordNoteDatum) return {notFound: true}
  const contentUUID = wordNoteDatum.contents[locale as Language]
  const text = await loadWordNoteContentFromAzure(contentUUID)
  const mdxSource = await renderToString(text, {components: wordNoteContentMDXComponents})
  return {props: {source: mdxSource}}
}

type Props = {
  source: string
}

const Page: React.FC<Props> = (props) => {
  const content = hydrate(props.source, {components: wordNoteContentMDXComponents})
  return <>
    {content}
  </>
}

export default Page