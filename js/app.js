// Select Element
const clear = document.querySelector('.clear')
const dataElement = document.getElementById('date')
const list = document.getElementById('list')


// Classes name
const CHECK = 'fa-check-circle'
const UNCHECK = 'fa-circle-thin'
const LINE_THROUGH = 'lineThrough'

// varibles
let id = 0, LIST = []

// Get item from localstorage
let data = localStorage.getItem('TODO')


if(data) {
  LIST = JSON.parse(data)
  id = LIST.length
  loadList(LIST)
} else {
  LIST = []
  id = 0
}

// Load items to the user's interface
function loadList(array) {
  array.forEach((item) => {
    addToDo(item.name, item.id, item.done, item.trash)
  })
}

// Clear localStrorage
clear.addEventListener('click', function() {
  localStorage.clear()
  location.reload()
})

// Show todays date
let options = {weekday: 'long', month: 'short', day: 'numeric'}
let today = new Date()
dataElement.innerHTML = today.toLocaleDateString('en-US', options)

function addToDo(toDo, id, done, trash) {
  if(trash) { return }
  const DONE = done ? CHECK : UNCHECK
  const LINE = done ? LINE_THROUGH : ''
  const item = `
                <li class="item">
                  <i class="fa ${DONE} co" job="completed" id="${id}"></i>
                  <p class="text ${LINE}">${toDo}</p>
                  <i class="fa fa-trash-o de" job="remove" id="${id}"></i>
                </li>`
  const postion = 'beforeend'
  list.insertAdjacentHTML(postion, item)
}

//Add an item 
document.addEventListener('keyup', function(event) {
  if(event.keyCode == 13) {
    const toDo = input.value

    //if the input isn't empty
    if(toDo) {
      addToDo(toDo, id, false, false)
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      })
      localStorage.setItem("TODO", JSON.stringify(LIST))
      id++
    }
    input.value = ''
  }
})

// complete todo
function completeTodo(element) {
  console.log(element)
  element.classList.toggle(CHECK)
  element.classList.toggle(UNCHECK)
  element.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH)
  LIST[element.id].done = LIST[element.id].done ? false : true

}

//remove to do
function removeTodo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode)
  LIST[element.id].trash = true
}

// tagert the items created dynamically
list.addEventListener('click', function(event) {
  const element = event.target
  if(element.hasAttribute('job')) {
    const elementJob = element.attributes.job.value
    if(elementJob == 'completed') {
      completeTodo(element)
    } else if(elementJob == 'remove') {
      removeTodo(element)
    }
  } else {
    return
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
})