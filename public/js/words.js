let words = []
const $wordList = document.querySelector(".words-list")
const $searchInput = document.querySelector(".search-input")
const $searchResult = document.querySelector(".search-result")



const getWords = async () => {
  const res = await fetch('/words');
  words = await res.json();
  render();
}

const render = () => {
  $wordList.innerHTML = words.map(({id,word,mean}) => {
    return `<dt id="${id}">${word}<button class="remove-btn">X</button></dt>
    <dd id="ck-${id}">${mean}</dd>
    `    
  }).join('');
}

document.addEventListener('DOMContentLoaded', getWords);

const add = async (wordInput, meanInput)=> {
  
  const res = await fetch('/words', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id: generateNextId(), word: wordInput, mean: meanInput, result: true})
  });
  words = await res.json();
  render();    
}

const remove = id => {
  words = words.filter(word => word.id !== +id);
  render();    
}

const generateNextId = () => {
  return Math.max(...words.map(word => word.id), 0) + 1
}

document.querySelector('.search-btn').onclick = e => {
  if($searchInput.value === "") return
  if($searchInput.value === words.map(word => word.word).find(element => element === $searchInput.value))    
  return $searchResult.value = words.filter(({ word }) => word === $searchInput.value)[0].mean
  // ,document.querySelector('.add-btn').textContent = "Edit"
  // document.querySelector('.delete-btn').textContent = "Disabled"
  alert("단어가 없습니다")
}

document.querySelector('.add-btn').onclick = () =>{
  if($searchInput.value === ""||$searchResult.value==="") return
  const wordInput = $searchInput.value;
  const meanInput = $searchResult.value;
  $searchInput.value = "";
  $searchResult.value = "";
  add(wordInput, meanInput);
}

document.querySelector('.search-result').onkeydown = e =>{
  if(e.key !== "Enter" ) return
  if($searchInput.value === ""||$searchResult.value==="") return
  add()
}

document.querySelector('.words-list').onclick = e => {
  if(!e.target.classList.contains('remove-btn')) return;
  const id = e.target.parentNode.id
  remove(id);
}

document.querySelector('.clear-btn').onclick = () => {
  words = []
  render();
}

