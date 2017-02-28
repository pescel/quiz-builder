import React from 'react';
import Answers from './Answers';


const Questions = ({questions}) => {
  let quiz = questions.map((question) => {

    return (
      <div key={question.id}>
        <h2>{question.title}</h2>
        <Answers answers={question.answers} id={question.id} />
      </div>
    )
  })
  return (
    <div>{quiz}</div>
  )
}
export default Questions;
