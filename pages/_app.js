import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Head from 'next/head';
import db from '../db.json';

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
    color: ${({ theme }) => theme.colors.contrastText};
  }
  html, body{
    min-height:100vh;
  }
  #__next{
    flex:1;
    display:flex;
    flex-direction:column;
  }
`;

const { theme } = db;

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{db.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content={db.bg} />
        <meta property="og:url" content={db.external} />
        <meta property="og:title" content={db.title} />
        <meta property="og:description" content={db.description} />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
