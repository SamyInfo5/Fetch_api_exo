const container = document.getElementById('postContainer')

fetch('https://jsonplaceholder.typicode.com/posts')
.then(function (response) {return response.json()})
.then(function (data) {
  for (i = 0; i < data.length; i++) {
    let id = data[i].id
    let title = data[i].title
    let body = data[i].body
    let userId = data[i].userId 

    const card = document.createElement('div')
    card.setAttribute('class','card')

    const bodycard = document.createElement('div')
    bodycard.setAttribute('class', 'card-body')

    const h = document.createElement('h5')
    h.setAttribute('class','card-title')
    h.innerHTML= title

    const b = document.createElement('h6')
    b.setAttribute('class','card-subtitle mb-2 text-muted')
    b.innerHTML= id

    const p = document.createElement('p')
    p.setAttribute('class','card-text')
    p.innerHTML= body

    bodycard.appendChild(h)
    bodycard.appendChild(b)
    bodycard.appendChild(p)
    card.appendChild(bodycard)
    container.appendChild(card)
  }
})