// Usa o themeprovider para sobrescrever o tema do sistema definido em _app
import { ThemeProvider } from 'styled-components';

import QuizScreen from '../../src/screens/Quiz';
// import { Container } from './styles';

function QuizDaGaleraPage({ externalDb }) {
  return (
    <ThemeProvider theme={externalDb.theme}>
      <QuizScreen
        externalQuestions={externalDb.questions}
        externalBg={externalDb.bg}
        externalTheme={externalDb.theme}
      />
    </ThemeProvider>
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
