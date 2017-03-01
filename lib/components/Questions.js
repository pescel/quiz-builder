import React from 'react';
import Answers from './Answers';


const Questions = ({questions, setScore}) => {
  let quiz = questions.map((question) => {

    return (
      <div key={question.id}>
        <h2>{question.title}</h2>
        <Answers setScore={setScore} answers={question.answers} id={question.id} />
      </div>
    )
  })
  return (
    <div>{quiz}</div>
  )
}
export default Questions;
