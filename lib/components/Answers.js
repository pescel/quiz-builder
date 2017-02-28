import React from 'react';
// import Questions from './Questions';

const Answers = ({answers}) => {
  let a = answers.map((answer) => {
    return (
      <div>
        <input name='answer' type='radio'/> {answer.title}
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
