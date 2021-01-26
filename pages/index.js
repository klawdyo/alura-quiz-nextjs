import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import QuizLogo from '../src/components/QuizLogo';
import GithubCorner from '../src/components/GithubCorner'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`

const BackgroundImage = styled.div`
  background-image: url(${db.bg});
  height: 100vh;
  background-size: cover;
`

export const QuizContainer = styled.div`
  width:100%;
  max-width:350px;
  padding-top: 45px;
  margin:auto 10%;
  @media screen and (max-width: 500px){
    margin:auto;
    padding:15px;
  }
`


export default function Home() {
  console.log('cor no home', db.theme.colors.contrastText)
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
