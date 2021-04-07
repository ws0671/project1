const express = require('express');

const app = express();

let words = [
  { id: 3, word: 'rabbit', mean: '토끼', result: true },
  { id: 2, word: 'lion', mean: '사자', result: true },
  { id: 1, word: 'tree', mean: '나무', result: true }
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




