const container = document.getElementById('postContainer')

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(function (response) { return response.json() })
  .then(function (data) {
    for (i = 0; i < data.length; i++) {
      let id = data[i].id
      let title = data[i].title
      let body = data[i].body
      let userId = data[i].userId

      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      const bodycard = document.createElement('div')
      bodycard.setAttribute('class', 'card-body')
      bodycard.setAttribute('id', id)

      const h = document.createElement('h5')
      h.setAttribute('class', 'card-title')
      h.innerHTML = title

      const p = document.createElement('p')
      p.setAttribute('class', 'card-text')
      p.innerHTML = body

      const button = document.createElement('button')
      button.setAttribute('class', 'btn btn-danger')
      button.setAttribute('id', 'btn')
      button.setAttribute('onclick', `showpost(${id})`)
      button.innerHTML = 'Voir les commentaire'


      bodycard.appendChild(h)
      bodycard.appendChild(p)
      bodycard.appendChild(button)
      card.appendChild(bodycard)
      container.appendChild(card)
    }
  })



function showpost(Id) {
  const postElement = document.getElementById(`${Id}`);
  const commentElement = document.getElementById(`comments-${Id}`);

  if (commentElement) {
    // Les commentaires sont déjà affichés, on les masque
    commentElement.style.display = 'none';
    postElement.removeChild(commentElement);
    return;
  }
  fetch(`https://jsonplaceholder.typicode.com/posts/${Id}/comments`,)
    .then(function (response) { return response.json() })
    .then(comments => {

      const commentaire = document.createElement('div');
      commentaire.setAttribute('id',`idiv`)
      commentaire.id = `comments-${Id}`;
      commentaire.style.display = 'block';
      
      comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.setAttribute('id',`${Id}`)
        commentElement.innerHTML = `<strong>Name:</strong> ${comment.name}<br>
        <strong>Email:</strong> ${comment.email}<br>
        <strong>Body:</strong> ${comment.body}<br><br>`;
        commentaire.appendChild(commentElement);
      });
      postElement.appendChild(commentaire)
    })
  }