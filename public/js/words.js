let words = []
const $wordList = document.querySelector(".words-list")
const $searchInput = document.querySelector(".search-input")
const $searchResult = document.querySelector(".search-result")

words = [
    { id: 3, word: 'rabbit', mean: '토끼', result: true },
    { id: 2, word: 'lion', mean: '사자', result: true },
    { id: 1, word: 'tree', mean: '나무', result: true }
]

const render = () => {
    $wordList.innerHTML = words.map(({id,word,mean}) => {
        return `<dt id="${id}">${word}</dt>
                <dd id="ck-${id}">${mean}</dd>`
    }).join('');
}

document.addEventListener('DOMContentLoaded', render);

const add = () => {
  words = [{id: generateNextId(), word: $searchInput.value, mean: $searchResult.value }, ...words]
  $searchInput.value = "";
  $searchResult.value = "";
  render();    
}

const remove = () => {
  if(words.map(word => word.word).find(element => element === $searchInput.value ))
  words = words.filter(word => word.word !== $searchInput.value)
  if(words.map(word => word.mean).find(element => element === $searchResult.value ))
  words = words.filter(word => word.mean !== $searchResult.value)
  
  $searchInput.value = "";
  $searchResult.value = "";
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
  add()
}
document.querySelector('.search-result').onkeydown = e =>{
  if(e.key !== "Enter" ) return
  if($searchInput.value === ""||$searchResult.value==="") return
  add()
}

document.querySelector('.delete-btn').onclick = () => {
  remove()
}

document.querySelector('.clear-btn').onclick = () => {
  words = []
  render();
}

