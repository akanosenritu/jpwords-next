import React from "react"
import {Ruby} from "../Ruby"
import {EnglishTranslation, SpanishTranslation} from "../Translation"
import {MDXProvider} from "@mdx-js/react"

export const wordNoteContentMDXComponents = {
  Ruby: (props: any) => <Ruby {...props} />,
  script: () => <p>SCRIPT TAG IS NOT ALLOWED</p>,
  ENG: (props: any) => <EnglishTranslation {...props} />,
  ESP: (props: any) => <SpanishTranslation {...props} />
}

export const WordNoteContentMDXProvider: React.FC = props => {
  return <MDXProvider components={wordNoteContentMDXComponents}>
    {props.children}
  </MDXProvider>
}