import './App.css';
import { useEffect, useState } from 'react';
import he from 'he';

function Question(props) {
    const [chosenAnswer, setChosenAnswer] = useState(null);
    const [answers, setAnswers] = useState([]);

    const { question, index, increaseCorrectAnswer, goToNextQuestion } = props;
    const questionTitle = he.decode(question.question);

    useEffect(() => {
        const as = [...question.incorrect_answers];
        let randomIndex = Math.floor(Math.random() * (answers.length + 1));
        as.splice(randomIndex, 0, question.correct_answer)
        setAnswers(as);
    }, [])

    const answerQuestion = (answer, correctAnswer, answerIndex) => {
        if (answer === correctAnswer) {
            increaseCorrectAnswer(true)
        } else {
        }
        setChosenAnswer(answerIndex);
    }

    return (
        <div className='question'>
            <h3>{questionTitle}
                <ul>
                    {answers.map((answer, answerIndex) => (
                        <li
                            style={{ backgroundColor: chosenAnswer == null || (chosenAnswer != answerIndex) ? '' : answers[chosenAnswer] === question.correct_answer ? 'green' : 'red' }}
                        >
                            <input
                                disabled={chosenAnswer != null}
                                onClick={() => answerQuestion(answer, question.correct_answer, answerIndex)}
                                type="radio"
                                name={`answer-question-${index}`}>
                            </input>{answer}
                        </li>
                    ))}
                </ul>
            </h3>
            <button className='btn btn-danger' disabled={chosenAnswer == null} onClick={() => goToNextQuestion()}>Next</button>
        </div>

    );
}


export default Question;
