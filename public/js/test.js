let testWords = [];
let wrongWords = [];
let correctWords = [];
let testWordsNum = 0;
let testWordsIndex = 0;
let testRunning = false;

//입출력
const $testAnswer = document.querySelector('.test-word');
const $testNum = document.querySelector('.test-num');
const $answerInput = document.querySelector('.answer');

//시작, 종료버튼
const $testStartAndSkipBtn = document.querySelector('.test-start-btn');
const $testFinishBtn = document.querySelector('.test-finish-btn');

//탭 이벤트 
const $wordsTab = document.querySelector('.tab.words');
const $testTab = document.querySelector('.tab.test');
const $wordsPage = document.querySelector('.words-page');
const $testPage = document.querySelector('.test-page');

//팝업
const $testResultPopup = document.querySelector('.test-result-popup');
const $testResultWrongWords = document.querySelector('.test-results-wrong-words');
const $PopupCloseBtn = document.querySelector('.close-result-btn');
const $testScore = document.querySelector('.test-score');
const $overlay = document.querySelector('.overlay');



const getTestWords = async () => {
  const res = await fetch('/words');
  testWords = await res.json();
  
  const shuffle = array => {
      for (let i = 0; i < array.length; i++) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      };
      return array;
    };
  shuffle(testWords);
  testWordsNum = testWords.length;
};


const testWordsOutput = () => {
  if (testWordsIndex === testWords.length) return popupOutput();
  $testAnswer.textContent = testWords[testWordsIndex].word;
  $testNum.textContent = `${testWordsIndex + 1}/${testWordsNum}`;
};

const checkAnswer = () => {
  if ($answerInput.value === testWords[testWordsIndex].mean){
    $testAnswer.textContent = '맞았습니다';
    getCorrectWord();
  } else {
    $testAnswer.textContent = '틀렸습니다';
    getWrongWord();
  };
  ++testWordsIndex;
  setTimeout(testWordsOutput, 800);
};

const getCorrectWord = () => {
  correctWords = [
    {Quiz: `${testWords[testWordsIndex].word}`, 
    yourAnswer: `${$answerInput.value}`, 
    correctAnswer: `${testWords[testWordsIndex].mean}`}, ...correctWords
  ];
};

const getWrongWord = () => {
  wrongWords = [
    {Quiz: `${testWords[testWordsIndex].word}`, 
    yourAnswer: `${$answerInput.value ? $answerInput.value : 'skip'}`, 
    correctAnswer: `${testWords[testWordsIndex].mean}`}, ...wrongWords
  ];
};

const skip = () => {
  getWrongWord();
  ++testWordsIndex;
  testWordsOutput();
};

const popupOutput = () => {
  testRunning = false;
  changeDisabledAndCursor();
  $testAnswer.textContent = 'Test Word';
  $testStartAndSkipBtn.textContent = 'Start';
  testWordsIndex = 0;
  $testNum.textContent = `${testWordsIndex}/0`;  
  if (wrongWords.length === 0 && correctWords.length === 0) return;
  $testResultWrongWords.innerHTML = wrongWords.map(
    ({Quiz, yourAnswer, correctAnswer}) => 
    `<li>
    <em>${Quiz}</em>
    <span>${yourAnswer}</span>
    <span>${correctAnswer}</span>
    </li>`
    ).join('');
  $testScore.textContent = `${
    (100 - wrongWords.length / (testWords.length) * 100)
    .toFixed(0)
  }`;
  $overlay.style.display = 'block';
  $testResultPopup.style.display = 'block';
  $testPage.classList.toggle('active');
  $testResultPopup.classList.toggle('active');
  wrongWords = [];
  correctWords = [];
  };
  
const changeDisabledAndCursor = () => {
  $testFinishBtn.disabled = !testRunning;
  $answerInput.disabled = !testRunning;
  if (testRunning) {
    $wordsTab.style.cursor = 'not-allowed';
    $answerInput.style.cursor = 'auto';
    $testFinishBtn.style.cursor = 'pointer';
  } else {
    $wordsTab.style.cursor = 'pointer';
    $answerInput.style.cursor = 'not-allowed';
    $testFinishBtn.style.cursor = 'not-allowed';
  };
};
  
  //이벤트 핸들러
$testStartAndSkipBtn.onclick = e => {
  if(testWords.length === 0) return;
  if (e.target.textContent === 'skip') return skip();
  testRunning = true;
  changeDisabledAndCursor();
  testWordsOutput();
  $answerInput.focus();
  $testStartAndSkipBtn.textContent = 'skip';
};

$testFinishBtn.onclick = () => {
  $answerInput.value = '';
  popupOutput();
};


$PopupCloseBtn.onclick = () => {
  $testPage.classList.toggle('active');
  $testResultPopup.classList.toggle('active');
  $testResultPopup.style.display = 'none';
  $overlay.style.display = 'none';
};

$answerInput.onkeypress = e => {
  if (!$answerInput.value || e.key !== 'Enter') return;
  checkAnswer();
  $answerInput.value = '';
};

$wordsTab.onclick = () => {
  if ($wordsPage.classList.contains('active') || testRunning) return;
  $wordsPage.classList.toggle('active');
  $testPage.classList.toggle('active');
};

$testTab.onclick = () => {
  if ($testPage.classList.contains('active')) return;
  getTestWords();
  $testPage.classList.toggle('active');
  $wordsPage.classList.toggle('active');
};

document.querySelector('.test-form').onsubmit = e => {
  e.preventDefault();
};
