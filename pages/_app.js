import { createGlobalStyle, ThemeProvider } from 'styled-components'
import db from '../db.json'
import Header from 'next/head'

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    display:flex;
    flex-direction:column;
    font-family: 'Lato', sans-serif;
    color: ${({theme}) =>theme.colors.contrastText};
  }
  html,body{
    min-height:100vh;
  }
  #__next{
    flex:1;
    display:flex;
    flex-direction:column;
  }
`

const theme = db.theme;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header>
        <meta property="og:image" content={db.bg} />
        <meta property="og:url" content={db.external} />
        <meta property="og:title" content={db.title} />
        <meta property="og:description" content={db.description} />
      </Header>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
