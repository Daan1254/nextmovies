import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Test</title>
        <meta property="og:title" content="My page title" key="title" />
        <meta name="description" content="The best cinema to view movies in!"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
