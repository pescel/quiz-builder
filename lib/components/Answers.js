import React from 'react';
// import Questions from './Questions';

const Answers = ({answers, id, setScore}) => {
  let a = answers.map((answer) => {
    return (
      <div>
        <input onChange={() => setScore(id, answer.score)} name='answer' type='radio'/> {answer.title}
      </div>
    )
  })
  return (
    <form>
      {a}
    </form>
  )
}

export default Answers;
