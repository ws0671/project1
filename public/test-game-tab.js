let words = [];
let testWords = [];
let resultWords = [];
let testWordsNum;

const $wordsTab = document.querySelector('.tab-words');
const $testTab = document.querySelector('.tab-test');
const $wordsPage = document.querySelector('.words-page');
const $testPage = document.querySelector('.test-page');

const $problem = document.querySelector('.problem');
const $startBtn = document.querySelector('.start-btn');
const $finishBtn = document.querySelector('.finish-btn');
const $answerInput = document.querySelector('.answer');
const $questionsNum = document.querySelector('.questions-num');

const $popup = document.querySelector('.popup');
const $closeBtn = document.querySelector('.close-btn');
const $overlay = document.querySelector('.overlay');
const $wrongWords = document.querySelector('.wrong-words');
const $correctNum = document.querySelector('.correct-num');
const $wrongNum = document.querySelector('.wrong-num');

const getWords = () => {
  words = [
    {id:1, word:'tree', mean:'나무', result: true},
    {id:2, word:'bird', mean:'새', result: true},
    {id:3, word:'orange', mean:'오렌지', result: true},
    {id:4, word:'melon', mean:'멜론', result: true},
    {id:5, word:'dog', mean:'개', result: true},
    {id:6, word:'cat', mean:'고양이', result: true}
  ];
  shuffle(words);
  getTestWords();
};

document.addEventListener('DOMContentLoaded', getWords);

const getTestWords = () => {
  testWords = words.slice(0, 11)
  testWordsNum = testWords.length;
};
const start = () => {
  if (testWords.length === 0) return resultPopup()
  $problem.textContent = testWords[0].word;
  $questionsNum.textContent = `${resultWords.length + 1}/${testWordsNum}`
};
const checkWord = e => {
  if (e.key === 'Enter' && $answerInput.value) {
    if ($answerInput.value === testWords[0].mean) { 
      $problem.textContent = '맞았습니다'
    }else {
      $problem.textContent = '틀렸습니다';
      testWords[0].result = false;
    }
    $answerInput.value = '';
    resultWords = [testWords.shift(),...resultWords];
    setTimeout(start, 500);
  };
};

const resultPopup = () => {
  $problem.textContent = 'Sample word';
  $questionsNum.textContent = '0/0';
  $finishBtn.disabled = true;
  $answerInput.disabled = true;
  $wordsTab.disabled = false;
  $wordsTab.style.cursor = 'pointer';
  $answerInput.style.cursor = 'not-allowed';
  $finishBtn.style.cursor = 'not-allowed';
  if (resultWords.length === 0) return;
  popupRender();
  $popup.style.display = 'block'; 
  $overlay.style.display = 'block';
};
const popupRender = () => {
  $correctNum.textContent = resultWords.filter(({ result }) => result).length;
  $wrongNum.textContent = resultWords.filter(({ result }) => !result).length;
  $wrongWords.innerHTML = resultWords.filter(({result}) => !result).map(({ word, mean }) => {
    return `<li>
    <span class="word">${word}</span>
    <span>|</span>
    <span class="mean">${mean}</span>
    </li>`
  }).join('');
};

const shuffle = array => {
  for (let i = 0; i < array.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

$closeBtn.onclick = () => {
  $popup.style.display = 'none';  
  $overlay.style.display = 'none';
  testWords = [...resultWords, ...testWords];
  shuffle(testWords);
  resultWords = [];
};
$finishBtn.onclick = () => {
  resultPopup();
};
$startBtn.onclick = () => {
  $finishBtn.disabled = false;
  $answerInput.disabled = false;
  $wordsTab.disabled = true;
  $answerInput.style.cursor = 'auto';
  $finishBtn.style.cursor = 'pointer';
  $wordsTab.style.cursor = 'not-allowed';
  start();
};
$answerInput.onkeydown = e => {
  checkWord(e);  
};

$wordsTab.onclick = () => {
  $wordsPage.style.display = 'flex';
  $testPage.style.display = 'none';  
};
$testTab.onclick = () => {
  $wordsPage.style.display = 'none';
  $testPage.style.display = 'flex';  
};