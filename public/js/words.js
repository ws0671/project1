let words = []
const $wordList = document.querySelector(".words-list")
const $searchInput = document.querySelector(".search-input")
const $searchResult = document.querySelector(".search-result")
words = [
    { id: 3, word: 'rabbit', mean: '토끼'},
    { id: 2, word: 'lion', mean: '사자' },
    { id: 1, word:'tree' , mean: '나무' }
]

const render = () => {
    $wordList.innerHTML = words.map(({id,word,mean}) => {
        return `<dt id="${id}">${word}</dt>
                <dd id="ck-${id}">${mean}</dd>`
    }).join('');
}

document.addEventListener('DOMContentLoaded', render);

const addTodo = () => {
  words = [{id: generateNextId(), word: $searchInput.value, mean: $searchResult.value }, ...words]
  $searchInput.value = "";
  $searchResult.value = "";
  render();    
}

const generateNextId = () => {
  return Math.max(...words.map(word => word.id), 0)+1
}

document.querySelector('.add-btn').onclick = () =>{
  if($searchInput.value === ""||$searchResult.value==="") return
  addTodo()
}