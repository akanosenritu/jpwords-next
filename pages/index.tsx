import React from "react"
import Layout from "../components/Layout"
import useTranslation from "next-translate/useTranslation"
import dynamic from "next/dynamic"

type Props = {
  language: string
}

const Page: React.FC<Props> = () => {
  const {t, lang} = useTranslation("common")
  const Content = dynamic(() => import(`../pageContents/${lang}/index.mdx`))
  return <Layout title={t("Welcome")}>
    <Content />
  </Layout>
}

export default Page
