import { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';

import db from '../db.json';

import Button from '../src/components/Button';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import BackLinkArrow from '../src/components/BackLinkArrow';
import AlternativesForm from '../src/components/AlternativesForm';

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
};

const loadingTimeout = 100;
const betweenQuestionsTimeout = 2000;

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>
      <Widget.Content>lopes</Widget.Content>
    </Widget>
  );
}
function ResultWidget({ results, onRestartClick }) {
  const resultsLength = results.filter((item) => item).length;

  return (
    <Widget>
      <Widget.Header>Finalizado</Widget.Header>
      <Widget.Content>
        {!resultsLength && <p>Você não acertou nenhuma questão.</p>}
        {resultsLength && <p>Você acertou {resultsLength} quest{resultsLength <= 1 ? 'ão' : 'ões'}</p>}

        <ul>
          { results.map((item, i) => {
            const key = `key${i}`;
            return (
              <li key={key}> #{i + 1} Resultado: { item ? 'Acertou' : 'Errou' }</li>
            );
          })}
        </ul>

        <Button type="button" onClick={onRestartClick}>Iniciar novamente</Button>
      </Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question, totalQuestions, questionIndex, onSubmit, onBackLinkClick, addResult,
}) {
  // Id usado para a pergunta
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);

  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget>
      <Widget.Header>
        {questionIndex !== 0 && <BackLinkArrow onClick={onBackLinkClick} />}
        <h3>
          Pergunta {questionIndex + 1} de {`${totalQuestions}`}
        </h3>
      </Widget.Header>

      <img
        src={question.image}
        alt=""
        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <AlternativesForm onSubmit={(e) => {
          e.preventDefault();
          setIsQuestionSubmited(true);
          addResult(isCorrect);

          setTimeout(() => {
            setIsQuestionSubmited(false);
            setSelectedAlternative(undefined);
            onSubmit();
          }, betweenQuestionsTimeout);
        }}
        >
          {/*  */}
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
            const isSelected = selectedAlternative === alternativeIndex;

            // Retorno
            return (
              <Widget.Topic
                key={alternativeId}
                as="label"
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  checked={selectedAlternative === alternativeIndex}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                  name={questionId}
                  id={alternativeId}
                />
                <span>{alternative}</span>
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected || isQuestionSubmited}>Confirmar</Button>
          {isQuestionSubmited && isCorrect && <p>Você acertou!</p> }
          {isQuestionSubmited && !isCorrect && <p>Você errou!</p> }
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [results, setResults] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const totalQuestions = db.questions.length;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([...results, result]);
  }

  function handleSubmit() {
    // e.preventDefault();

    const nextQuestion = questionIndex + 1;
    // Tem próxima questão?
    if (nextQuestion < totalQuestions) {
      // console.log('dados da questão', question.answer);
      setQuestionIndex(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  function handleBackLinkClick() {
    if (questionIndex - 1 >= 0) {
      setQuestionIndex(questionIndex - 1);
      const newResults = [...results];
      newResults.pop();
      // console.log('resultsdaods', newResults);
      setResults(newResults);
    }
  }

  function onRestartClick() {
    setQuestionIndex(0);
    setResults([]);
    setScreenState(screenStates.QUIZ);
  }

  // function onChangeAnswer() {
  // console.log('click', evt.target.value);
  // Pega o valor da alternativa correta e compara com o valor passado
  // const correctValue = question.alternatives[question.answer];
  // console.log('correta:', correctValue, 'clicada', evt.target.value);
  // console.log(correctValue === evt.target.value ? 'Correto' : 'Errado');
  // }

  useEffect(() => {
    // setTimeout(() => setScreenState(screenStates.RESULT), loadingTimeout);
    setTimeout(() => setScreenState(screenStates.QUIZ), loadingTimeout);
  }, []); // Só executa uma vez.

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        {/* Logo */}
        <QuizLogo color={db.theme.colors.contrastText} />
        {/* Questões */}
        {screenState === screenStates.QUIZ && (
        <QuestionWidget
          question={question}
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
          onSubmit={handleSubmit}
          onBackLinkClick={handleBackLinkClick}
          // onChangeAnswer={onChangeAnswer}
          addResult={addResult}
        />
        )}
        {/* Loading */}
        {screenState === screenStates.LOADING && <LoadingWidget /> }
        {screenState === screenStates.RESULT && (
        <ResultWidget
          results={results}
          onRestartClick={onRestartClick}
        />
        )}
      </QuizContainer>
    </QuizBackground>
  );
}
