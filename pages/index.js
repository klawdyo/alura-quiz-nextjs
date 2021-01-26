import { useState } from 'react';
import { useRouter } from 'next/router';

import styled from 'styled-components';
import db from '../db.json';
import Widget from '../src/components/Widget';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import QuizLogo from '../src/components/QuizLogo';
import GithubCorner from '../src/components/GithubCorner';

export const QuizContainer = styled.div`
  width:100%;
  max-width:350px;
  padding-top: 45px;
  margin:auto 10%;
  @media screen and (max-width: 500px){
    margin:auto;
    padding:15px;
  }
`;

export default function Home() {
  // Os hooks precisam estar fora das funções
  const router = useRouter();
  const [name, setName] = useState('');

  // Ao enviar o formulário
  function onSubmit(e) {
    e.preventDefault();

    // Redirecionar para a próxima página
    router.push(`/quiz?name=${name}`);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo color={db.theme.colors.contrastText} />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>

            <form onSubmit={onSubmit}>
              <input required placeholder="Diz aí seu nome" onChange={(e) => setName(e.target.value)} />
              <button type="submit" disabled={!name.length}>
                Jogar {name}
              </button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Content>
            <h1>Quizes da galera</h1>
            <p>-</p>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GithubCorner projectUrl="https://github.com/klawdyo" />
    </QuizBackground>
  );
}
