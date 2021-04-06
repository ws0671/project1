let testWords = [];
let wrongWords = [];
let testWordsNum = 0;
let testWordsIndex = 0;


$testAnswer = document.querySelector('.test-form > fieldset > label');
$testNum = document.querySelector('.test-num');

$testStartBtn = document.querySelector('.test-start-btn');
$testFinishBtn = document.querySelector('.test-finish-btn');

$answerInput = document.querySelector('.answer');
$wordsTab = document.querySelector('.tab.words');
$testTab = document.querySelector('.tab.test');
$wordsPage = document.querySelector('.words-page');
$testPage = document.querySelector('.test-page');

$testResultPopup = document.querySelector('.test-results-popup');
$testResultSection = document.querySelector('.test-result-section');



const getTestWords = () => {
  testWords = [
    {id:1, word:'tree', mean:'나무', result: true},
    {id:2, word:'bird', mean:'새', result: true},
    {id:3, word:'orange', mean:'오렌지', result: true},
    {id:4, word:'melon', mean:'멜론', result: true},
    {id:5, word:'dog', mean:'개', result: true},
    {id:6, word:'cat', mean:'고양이', result: true},
    {id:7, word:'orange', mean:'오렌지', result: true},
    {id:8, word:'melon', mean:'멜론', result: true},
    {id:9, word:'dog', mean:'개', result: true},
    {id:10, word:'cat', mean:'고양이', result: true}
  ];
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

const changeDisabled = () => {
  $testFinishBtn.disabled = !testRunning;
  $answerInput.disabled = !testRunning;
  $wordsTab.disabled = testRunning;
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

let testRunning = false;

const start = () => {
  if (testWordsIndex === testWords.length) return popupOutput();
  $testAnswer.textContent = testWords[testWordsIndex].word;
  $testNum.textContent = `${testWordsIndex + 1}/${testWordsNum}`;
};

const checkOfMean = () => {
  if ($answerInput.value === testWords[testWordsIndex].mean){
    $testAnswer.textContent = '맞았습니다';
  } else {
    $testAnswer.textContent = '틀렸습니다';
    getWrongWord();
  };
  ++testWordsIndex;
  setTimeout(start, 500);
};

const popupOutput = () => {
  testRunning = false;
  changeDisabled();
  $testAnswer.textContent = 'Sample Word';
  $testStartBtn.textContent = 'Start';
  if (testWordsIndex === 0) return;
  $testResultPopup.innerHTML = wrongWords.map(
    ({Quiz, yourAnswer, correctAnswer}) => 
  `<li>
  <em>Quiz: ${Quiz}</em>
  <span>Your answer : ${yourAnswer}</span>
  <span>Correct Answer : ${correctAnswer}</span>
  </li>`).join('');
  $testPage.classList.toggle('.active');
  $
  testWordsIndex = 0;
  $testNum.textContent = `${testWordsIndex}/0`;  
  wrongWords = [];
};

const getWrongWord = () => {
  wrongWords = [
    {Quiz: `${testWords[testWordsIndex].word}`, 
    yourAnswer: `${$answerInput.value ? $answerInput.value : 'skip'}`, 
    correctAnswer: `${testWords[testWordsIndex].mean}`}, 
    ...wrongWords
  ];
};

const skip = () => {
  getWrongWord();
  ++testWordsIndex;
  start();
};

$testStartBtn.onclick = e => {
  if (e.target.textContent === 'skip') return skip();
  testRunning = true;
  getTestWords();
  changeDisabled();
  start();
  $testStartBtn.textContent = 'skip';
};

$testFinishBtn.onclick = () => {
  popupOutput();
};

$answerInput.onkeydown = e => {
  if (!$answerInput.value || e.key !== 'Enter') return;
  checkOfMean();
  $answerInput.value = '';
};

$wordsTab.onclick = () => {
  $wordsPage.classList.toggle('active');
  $testPage.classList.toggle('active');
};

$testTab.onclick = () => {
  $testPage.classList.toggle('active');
  $wordsPage.classList.toggle('active');
};