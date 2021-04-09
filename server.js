const express = require('express');

const app = express();

let words = [
  // { id: 10, word: 'apple', mean: '사과'},
  // { id: 9, word: 'pink', mean: '분홍'},
  // { id: 8, word: 'green', mean: '초록'},
  // { id: 7, word: 'yellow', mean: '노랑'},
  // { id: 6, word: 'black', mean: '검정'},
  // { id: 5, word: 'blue', mean: '파랑'},
  // { id: 4, word: 'red', mean: '빨강'},
  { id: 3, word: 'rabbit', mean: '토끼'},
  { id: 2, word: 'lion', mean: '사자'},
  { id: 1, word: 'tree', mean: '나무'}
];

app.use(express.static('public'));
app.use(express.json());

//GET '/words'
app.get('/words', (req, res) => {
  res.send(words);
});

app.patch('/words/search', (req, res) => {
  const searchResult = words.filter(({ word }) => word === `${req.body.value}`)[0].mean;
  res.send(searchResult)
});

app.listen(9000, () => {
  console.log('hi');
});

app.post('/words', (req, res) => {
  words = [req.body, ...words];
  res.send(words)
});

app.delete('/words/clear', (req, res) => {
  words = [];
  res.send(words);
});

app.delete('/words/:id', (req, res) => {
  words = words.filter(word => word.id !== +req.params.id);
  res.send(words);
});




