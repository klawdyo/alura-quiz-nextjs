import { useState } from 'react';
import { useRouter } from 'next/router';

import { motion } from 'framer-motion';

import db from '../db.json';

import Footer from '../src/components/Footer';
import Input from '../src/components/Input';
import Button from '../src/components/Button';
import GithubCorner from '../src/components/GithubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import Link from '../src/components/Link';

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
        <Widget
          as={motion.section}
          transition={{ duration: 0.3, delay: 0 }}
          variants={{
            show: { opacity: 1, x: '0' },
            hidden: { opacity: 0, x: '-20%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>

            <form onSubmit={onSubmit}>
              {/* <Input /> */}
              <Input name="Nome" value={name} placeholder="Diz aí seu nome" onChange={(e) => setName(e.target.value)} />
              <Button type="submit" disabled={!name.length}>
                Jogar {name}
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          transition={{ duration: 0.3, delay: 0.2 }}
          variants={{
            show: { opacity: 1, x: '0' },
            hidden: { opacity: 0, x: '-20%' },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da galera</h1>
            <ul>
              {db.external.map((url) => {
                const rgx = /https:\/\/([0-9a-z_-]+)\.([0-9a-z_-]+)\.vercel\.app\/?/ig;
                const [, user = null, project = null] = [...url.matchAll(rgx)][0] || [];
                return (
                  <li key={`${project}__${user}`}><Widget.Topic as={Link} href={`/quiz/${project}___${user}`}>{user}/{project}</Widget.Topic></li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.footer}
          transition={{ duration: 0.3, delay: 0.4 }}
          variants={{
            show: { opacity: 1, x: '0' },
            hidden: { opacity: 0, x: '-20%' },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GithubCorner projectUrl="https://github.com/klawdyo" />
    </QuizBackground>
  );
}
