import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import Question from './components/Question';

function App() {

  const [listQuestions, setListQuestions] = useState([])

  const [currentQuestion, setCurrentQuestion] = useState(0)

  const [numberOfCorrectAnswer, setNumberOfCorrectAnswer] = useState(0)

  const [startTime, setStartTime] = useState(0)

  const [endTime, setEndTime] = useState(0)

  useEffect(() => {
    const getQuestions = () => {
      axios.get('https://opentdb.com/api.php?amount=5')
        .then(function (response) {
          setListQuestions(response.data.results)
        });
    }

    getQuestions();
  }, [])

  const goToNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    if (listQuestions.length > 0 && currentQuestion == (listQuestions.length - 1)) {
      endQuiz()
    }
  }

  const increaseCorrectAnswer = (isCorrectAnswer) => {
    if (isCorrectAnswer) {
      setNumberOfCorrectAnswer(numberOfCorrectAnswer + 1)
    }
  }

  const reset = () => {
    setNumberOfCorrectAnswer(0)
    setCurrentQuestion(0)
    setStartTime(0)
  }
  const startQuiz = () => {
    setStartTime(new Date().getTime())
  }

  const endQuiz = () => {
    setEndTime(new Date().getTime())
  }

  return (
    <div className="App">
      {
        startTime == 0 ?
          (
            <button className='btn btn-success' onClick={startQuiz}>START</button>
          ) :
          (
            listQuestions.length > 0 && currentQuestion >= listQuestions.length ? (
              <div className='results'>
                <h1 className='text-warning font-weight-bold'> <i class="fa-solid fa-medal mr-3"></i>FINAL RESULTS <i class="fa-solid fa-medal ml-3"></i></h1>
                <h2 className='mt-3 font-weight-bold'>{numberOfCorrectAnswer >= (listQuestions.length / 2) ? 'PASS' : 'FAIL !'} </h2>
                <h4 className='mt-3'>{numberOfCorrectAnswer}/{listQuestions.length} </h4>
                <h5 className='mt-4'> It took you {Math.round((endTime - startTime) / 1000)} seconds to complete the Quiz</h5>
                <button type="button" class="btn btn-danger mt-5" onClick={reset}>Play again</button>
              </div>
            ) : (
              <div className='question'>
                <h1>Question {currentQuestion + 1} of {listQuestions.length}</h1>
                {listQuestions.map((question, index) => {
                  return currentQuestion === index ? <>
                    <Question
                      key={index}
                      question={question}
                      index={index}
                      goToNextQuestion={goToNextQuestion}
                      increaseCorrectAnswer={increaseCorrectAnswer}
                    >
                    </Question>
                  </> : <></>
                })
                }
              </div>
            )
          )
      }

    </div>
  );
}


export default App;
