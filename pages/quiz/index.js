import db from '../../db.json';
import QuizScreen from '../../src/screens/Quiz';

function Quiz() {
  return (
    <QuizScreen
      externalQuestions={db.questions}
      externalBg={db.bg}
      externalTheme={db.theme}
    />
  );
}

export default Quiz;
