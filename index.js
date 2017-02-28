const express = require('express');
const fs = require('fs');
const app = express();
const http = require('http').Server(app);
const cors = require('express-cors');
const bodyParser = require('body-parser');
var path    = require("path");
const logger = require('express-logger');
const locus = require('locus');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('port', process.env.PORT || 3001);
app.locals.title = 'Quizzer'
app.locals.scores = {
  lowest: 'You are a SyntaxError! Even the most experienced and thoughtful developers are gunna miss a comma once in a while.',
  low: 'You are a...ReferenceError! Trying to reference a variable that doesnt exist? If you love something, let it go. If it comes back to you, immediately push to master and thank your lucky stars.',
  high: 'You are a...TypeError! When undefined is not a function, burn everything to the ground.',
  highest: 'You are an InternalError! Something is very wrong deep down inside, but its nearly impossible to figure out what.'
}
app.locals.quizzes = [{
  title: 'What JavaScript Error Are You?',
  id: 1,
  questions: [
    {
      id: 1478253351169,
      title: 'On average, how many npm packages do you install per app?',
      answers: [
        {
          title: 'None. Everything I build is lovingly hand-made from scratch',
          score: 1,
        },
        {
          title: 'It depends on the size and scope of the application.',
          score: 0,
        },
        {
          title: 'At least a trillion',
          score: 2,
        },
        {
          title: 'npm WARN UNMET PEER DEPENDENCY',
          score: 3,
        },
      ]
    },
    {
      id: 1478253351170,
      title: 'What is Redux?',
      answers: [
        {
          title: 'A library for managing the state of application data',
          score: 0,
        },
        {
          title: 'An adjective meaning to bring back or revive',
          score: 1,
        },
        {
          title: 'A garbage fire',
          score: 2,
        },
        {
          title: 'Never heard of it',
          score: 3,
        }
      ]
    },
    {
      id: 1478253351171,
      title: 'How Do You Choose a JavaScript Framework?',
      answers: [
        {
          title: 'With thoughtful consideration for the size, scope and purpose of the application',
          score: 0,
        },
        {
          title: 'Whatever Steve says to use',
          score: 1,
        },
        {
          title: 'Build your own, there aren\'t enough',
          score: 2,
        },
        {
          title: 'Ouija Board',
          score: 3,
        },
      ]
    },
    {
      id: 1478253351172,
      title: 'What\'s Your Favorite Word To Console.Log()?',
      answers: [
        { title: 'Hello World!', score: 0, },
        { title: 'wtf',          score: 2, },
        { title: 'asdfasdf',     score: 1, },
        { title: 'WHATEVER',     score: 3, }
      ]
    },
  ]
}];
// Get all quizzes
app.get('/quizzes', (request, response) => {
  response.send({ quizzes: app.locals.quizzes });
});
// Get a single quiz
app.get('/quizzes/:id', (request, response) => {
  const { id } = request.params;
  const quiz = app.locals.quizzes.find(q => q.id == id);
  if (quiz) { return response.send({ quiz }); }
  else { return response.sendStatus(404); }
});
// Delete a question
app.delete('/quizzes/:quizId/questions/:questionId', (request, response) => {
  const { questionId, quizId } = request.params;
  const targetQuiz = app.locals.quizzes.find(q => q.id === parseInt(quizId));
  if (targetQuiz) {
    const quiz = targetQuiz.questions.filter(question => parseInt(questionId) !== question.id);
    return response.send({ quiz });
  } else {
    return response
      .status(404)
      .send( { error: `The questions with an id of ${questionId} could not be deleted.`});
  }
});
// Add a new question
app.post('/quizzes/:quizId/questions', (request, response) => {
  const { quizId } = request.params;
  const question = request.body;
  for (let requiredParameter of ['title', 'answers']) {
    if (!question[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { title: <String>, answers: <Array> }. You're missing a "${requiredParameter}" property.` });
    }
  }
  question.id = question.id || Date.now();
  const quiz = app.locals.quizzes.find(q => q.id == quizId);
  if (quiz) {
    quiz.questions.push(question);
    return response.send({ quiz });
  } else {
    return response
      .status(404)
      .send({ error: `Quiz with an id of ${quizId} not found.` });
    }
});
// Submit a score
app.post('/scores', (request, response) => {
  const { score } = request.body;
  let scoreType;
  if (0 <= score && score < 4) {
    scoreType = 'lowest';
  }
  else if (4 <= score && score < 8) {
    scoreType = 'low';
  }
  else if (8 <= score && score <= 12) {
    scoreType = 'high';
  }
  else {
    scoreType = 'highest';
  }
  switch(scoreType) {
    case 'lowest':
        return response.send({ score: app.locals.scores.lowest });
        break;
    case 'low':
        return response.send({ score: app.locals.scores.low });
        break;
    case 'high':
        return response.send({ score: app.locals.scores.high });
        break;
    case 'highest':
        return response.send({ score: app.locals.scores.highest });
        break;
    default:
      return response
        .status(422)
        .send({ error: `Invalid score: ${score}` });
  }
});
if (!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`);
  });
}
module.exports = app;
Add Comment C
