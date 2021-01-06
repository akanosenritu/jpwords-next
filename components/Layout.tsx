import React, { ReactNode } from 'react'
import Head from 'next/head'
import {Navigation} from "./Navigation";
import {UserProvider} from "./User/User";

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div>
      <UserProvider>
        <Navigation />
        <div style={{minWidth: 320, maxWidth: 700, margin: "auto", position:"relative"}}>
          {children}
        </div>
      </UserProvider>
    </div>
  </div>
)

export default Layout
