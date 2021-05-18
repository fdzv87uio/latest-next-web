import React, { ReactNode } from "react"
import Head from 'next/head'
import StoreProvider from "../../../state/StoreProvider"
import * as S from "./SiteWrapper.styles"

function SiteWrapper({ children }: { children: ReactNode }): JSX.Element {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
        <meta name='description' content='TODO' />
        <meta name='keywords' content='TODO' />
        <title>Stylecard</title>

        <link rel='manifest' href='/manifest.json' />
        <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
        <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png'></link>
        <meta name='theme-color' content='#fecd2f' />

        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap"
          rel="stylesheet"
        ></link>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core"></script>
        <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter"></script>
      </Head>
        <StoreProvider>
          <S.CustomBody>
          {children}
          </S.CustomBody>
        </StoreProvider>
    </>
  )
}

export default SiteWrapper
