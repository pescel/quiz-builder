import React, { Component } from 'react';
import Questions from './Questions';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      questions: [],
      title: '',
      score: {},
      message: ''
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

  postScore() {
    const scoreAPI = 'http://localhost:3001/scores'
    fetch(scoreAPI, {
      method: 'POST',
      body: {score: this.totalScore()}
    })
    .then(res => res.json())
    .then(res => this.setState({ message: res.score }))
  }

  setScore(questionId, answerScore) {
    var newScore = Object.assign({}, {[questionId]: answerScore}, this.state.score)
    this.setState({score: newScore})
  }

  totalScore() {
    var scores = this.state.score
    return Object.keys(scores).reduce((total, id) => {
      return total + scores[id]
    }, 0)
  }

  render() {
    const finalScore = this.totalScore()
    return (
      <div className='app-container'>
          <h1>{this.state.title}</h1>
          <Questions setScore={this.setScore.bind(this)} questions={this.state.questions} />
        <button onClick={this.postScore.bind(this)} className='submit-btn'>Submit</button>
        <p>{finalScore}</p>
        <p>{this.state.message}</p>
      </div>
    )
  }
}
