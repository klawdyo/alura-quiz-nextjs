// Usa o themeprovider para sobrescrever o tema do sistema definido em _app
import { ThemeProvider } from 'styled-components';
import Head from 'next/head';

import QuizScreen from '../../src/screens/Quiz';
// import { Container } from './styles';

function QuizDaGaleraPage({ externalDb }) {
  return (
    <>
      <Head>
        <title>{externalDb.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content={externalDb.bg} />
        <meta property="og:url" content={externalDb.external} />
        <meta property="og:title" content={externalDb.title} />
        <meta property="og:description" content={externalDb.description} />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <ThemeProvider theme={externalDb.theme}>
        <QuizScreen
          externalQuestions={externalDb.questions}
          externalBg={externalDb.bg}
          externalTheme={externalDb.theme}
        />
      </ThemeProvider>
    </>
  );
}

/**
  getServerSideProps é uma chamada que recebe variáveis a partir do servidor
  para serem usadas na página.
  Esta função retorna propriedades que serão usadas dentro da função da página
  quizdagalerapage acima

 */
export async function getServerSideProps({ params }) {
  // const {
  //   req: { url, method }, query, params, resolvedUrl,
  // } = context;
  // const pra
  console.log(params);
  // if (params.id){
  const [user, project] = params.id.split('___');
  // console.log('user', user, 'project', project);

  // }

  // console.log('Infos do next ', {
  //   url, method, query, params, resolvedUrl,
  // });

  const res = await fetch(`https://${project}.${user}.vercel.app/api/db`);

  // .then((res) => {
  const externalDb = res.ok ? await res.json() : {};
  // console.log('obj', obj);

  // throw new Error('Falha ao conectar');

  return {
    props: {
      externalDb,
    },
  };
}

export default QuizDaGaleraPage;
