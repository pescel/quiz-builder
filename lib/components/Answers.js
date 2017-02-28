import React from 'react';
// import Questions from './Questions';

const Answers = ({answers, handleChange, id}) => {
  let a = answers.map((answer) => {
    return (
      <div>
        <input name='answer' type='radio' onChange={ () => handleChange(id, answer.score)}/> {answer.title}
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
