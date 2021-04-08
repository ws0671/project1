let testWords = [];
let wrongWords = [];
let correctWords = [];
let testWordsNum = 0;
let testWordsIndex = 0;

//입출력
$testAnswer = document.querySelector('.test-form > fieldset > label');
$testNum = document.querySelector('.test-num');
$answerInput = document.querySelector('.answer');

//시작, 종료버튼
$testStartBtn = document.querySelector('.test-start-btn');
$testFinishBtn = document.querySelector('.test-finish-btn');

//탭 이벤트 
$wordsTab = document.querySelector('.tab.words');
$testTab = document.querySelector('.tab.test');
$wordsPage = document.querySelector('.words-page');
$testPage = document.querySelector('.test-page');

//팝업
$testResultPopup = document.querySelector('.test-results-popup');
$testResultSection = document.querySelector('.test-result-section');
$PopupCloseBtn = document.querySelector('.close-result-btn');
$testScore = document.querySelector('.test-score');
$overlay = document.querySelector('.overlay');



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

let testRunning = false;

const start = () => {
  if (testWordsIndex === testWords.length) return popupOutput();
  $testAnswer.textContent = testWords[testWordsIndex].word;
  $testNum.textContent = `${testWordsIndex + 1}/${testWordsNum}`;
};

const checkOfMean = () => {
  if ($answerInput.value === testWords[testWordsIndex].mean){
    $testAnswer.textContent = '맞았습니다';
    getCorrectWord();
  } else {
    $testAnswer.textContent = '틀렸습니다';
    getWrongWord();
  };
  ++testWordsIndex;
  setTimeout(start, 500);
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
  start();
};

const popupOutput = () => {
  testRunning = false;
  changeDisabled();
  $testAnswer.textContent = 'Sample Word';
  $testStartBtn.textContent = 'Start';
  testWordsIndex = 0;
  $testNum.textContent = `${testWordsIndex}/0`;  
  if (wrongWords.length === 0 && correctWords.length === 0) return;
  $testResultPopup.innerHTML = wrongWords.map(
    ({Quiz, yourAnswer, correctAnswer}) => 
    `<li>
    <em>Quiz: ${Quiz}</em>
    <span>Your answer : ${yourAnswer}</span>
    <span>Correct Answer : ${correctAnswer}</span>
    </li>`).join('');
    $testScore.textContent = `${(100 - wrongWords.length / (correctWords.length + wrongWords.length) * 100).toFixed(1)}`;
    $overlay.style.display = 'block';
    $testResultSection.style.display = 'block';
    $testPage.classList.toggle('active');
    $testResultSection.classList.toggle('active');
    wrongWords = [];
    correctWords = [];
  };
  
const changeDisabled = () => {
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
  
  
$testStartBtn.onclick = e => {
  if(testWords.length === 0) return;
  if (e.target.textContent === 'skip') return skip();
  testRunning = true;
  changeDisabled();
  start();
  $answerInput.focus();
  $testStartBtn.textContent = 'skip';
};

$testFinishBtn.onclick = () => {
  popupOutput();
};

$PopupCloseBtn.onclick = () => {
  $testPage.classList.toggle('active');
  $testResultSection.classList.toggle('active');
  $testResultSection.style.display = 'none';
  $overlay.style.display = 'none';
};

$answerInput.onkeydown = e => {
  if (!$answerInput.value || e.key !== 'Enter') return;
  checkOfMean();
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
