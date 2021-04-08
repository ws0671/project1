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
    return `<dt id="${id}"><span>${word}</span><button type="button" class="remove-btn" aria-label="delete">×</button></dt>
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
  $searchInput.focus();
  render();    
}

const remove = async id => {
  const res = await fetch(`/words/${id}`, {method:'DELETE'});
  words = await res.json();
  render();    
};

const clear = async () => {
  const res = await fetch('/words/clear', {method: 'DELETE'});
  words = await res.json();
  render();
};

const search = async searchInputValue => {
  const res = await fetch('/words/search', {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({value: `${searchInputValue}`})
  });
  $searchResult.value = await res.text();
  render();
};

const generateNextId = () => {
  return Math.max(...words.map(word => word.id), 0) + 1
}

document.querySelector('.search-btn').onclick = e => {
  if($searchInput.value === "") return
  if($searchInput.value === words.map(word => word.word).find(element => element === $searchInput.value))    
  return search($searchInput.value);
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


$wordList.onclick = e => {
  if(!e.target.classList.contains('remove-btn')) return;
  const id = e.target.parentNode.id
  remove(id);
}

document.querySelector('.clear-btn').onclick = () => {
  clear();
}

$searchInput.onkeydown = e =>{
  if(e.key === "Enter" ) $searchResult.focus()
}

$searchResult.onkeydown = e =>{
  if(e.key === "Enter" ) document.querySelector('.add-btn').focus()
}
