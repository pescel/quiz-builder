import React, { Component } from 'react';
import Questions from './Questions';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      questions: [],
      title: '',
      score: {}
    }
  }


  componentDidMount() {
    this.getQuizzes()
  }


  getQuizzes() {
    const quizAPI = 'http://localhost:3001/quizzes';
    fetch(quizAPI)
    .then(response => response.json())
    .then(response => response.quizzes.map(quiz => {
      this.setState({questions: quiz.questions, title: quiz.title});

    }))
  }

    
  render() {
    return (
      <div className='app-container'>
        <div className='quiz-container'>
          <h1>{this.state.title}</h1>
          <Questions questions={this.state.questions} />

        </div>
        <button className='submit-btn'>Submit</button>
      </div>
    )
  }
}
