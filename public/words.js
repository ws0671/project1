let words = []
const $wordList = document.querySelector(".word-list")
const $searchInput = document.querySelector(".search-result")
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
    words = [{id: 4, word: $searchInput.value, mean: }]
}

const generateNextId = () => {
    words.map()
}