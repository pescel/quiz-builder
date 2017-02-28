import React, { Component } from 'react';
import Questions from './Questions';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      questions: [],
      title: '',
      score: {},
      totalScore: ''
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

  handleChange(questionId, num) {
    let stateScore = this.state.score
    Object.assign(stateScore, {[questionId]: num})
    this.setState({ score: stateScore })
  }

  handleSubmit() {
    var state = this.state.score
    return Object.keys(state).reduce((obj, num) => {
      return obj + state[num]
    }, 0);
  }

  postScore() {
    var postAPI = 'http://localhost:3001/scores'
    fetch(postAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        score: this.state.totalScore
      })
    })
    .then((response) => response.json())
    .then((response) => console.log(response))
  }

  render() {
    const scoreTotal = this.handleSubmit();
    return (
      <div className='app-container'>
          <h1>{this.state.title}</h1>
          <Questions questions={this.state.questions} handleChange={this.handleChange.bind(this)} />
          <button  onClick={this.postScore.bind(this)} className='submit-btn'>Submit</button>
          <p>{scoreTotal}</p>
      </div>
    )
  }
}
