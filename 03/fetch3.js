const container = document.getElementById('postContainer');
const itemsPerPage = 10;
let currentPage = 1;
let totalPages;

function showPage(pageNumber) {
  const paginationItems = document.querySelectorAll('.page-item');
  paginationItems.forEach(item => {
    item.classList.remove('active');
  });

  const currentPageItem = document.getElementById(`page-${pageNumber}`);
  currentPageItem.classList.add('active');

  const previousButton = document.getElementById('previous-button');
  const nextButton = document.getElementById('next-button');

  if (pageNumber === 1) {
    previousButton.classList.add('disabled');
  } else {
    previousButton.classList.remove('disabled');
  }

  if (pageNumber === totalPages) {
    nextButton.classList.add('disabled');
  } else {
    nextButton.classList.remove('disabled');
  }

  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(function (response) { return response.json() })
    .then(function (data) {
      container.innerHTML = '';

      for (let i = startIndex; i < endIndex; i++) {
        if (i >= data.length) {
          break;
        }

        let id = data[i].id;
        let title = data[i].title;
        let body = data[i].body;
        let userId = data[i].userId;

        const card = document.createElement('li');
        card.setAttribute('class', 'card');

        const bodycard = document.createElement('div');
        bodycard.setAttribute('class', 'card-body');
        bodycard.setAttribute('id', id);

        const h = document.createElement('h5');
        h.setAttribute('class', 'card-title');
        h.innerHTML = title;

        const p = document.createElement('p');
        p.setAttribute('class', 'card-text');
        p.innerHTML = body;

        const button = document.createElement('button');
        button.setAttribute('class', 'btn btn-danger');
        button.setAttribute('id', 'btn');
        button.setAttribute('onclick', `showpost(${id})`);
        button.innerHTML = 'Voir les commentaires';

        bodycard.appendChild(h);
        bodycard.appendChild(p);
        bodycard.appendChild(button);
        card.appendChild(bodycard);
        container.appendChild(card);
      }
    });
}

function showpost(id) {
  const postElement = document.getElementById(`${id}`);
  const commentElement = document.getElementById(`comments-${id}`);

  if (commentElement) {
    commentElement.style.display = 'none';
    postElement.removeChild(commentElement);
    return;
  }
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`,)
    .then(function (response) { return response.json() })
    .then(comments => {

      const commentaire = document.createElement('div');
      commentaire.setAttribute('id', `idiv`)
      commentaire.id = `comments-${id}`;
      commentaire.style.display = 'block';

      comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.setAttribute('id', `${id}`)
        commentElement.innerHTML = `<strong>Name:</strong> ${comment.name}<br>
        <strong>Email:</strong> ${comment.email}<br>
        <strong>Body:</strong> ${comment.body}<br><br>`;
        commentaire.appendChild(commentElement);
      });
      postElement.appendChild(commentaire)
    })
}

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(function (response) { return response.json() })
  .then(function (data) {
    totalPages = Math.ceil(data.length / itemsPerPage);

    const pagination = document.createElement('div');
    pagination.setAttribute('class', 'pagination');

    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement('a');
      pageLink.setAttribute('href', '#');
      pageLink.innerHTML = i;
      pageLink.setAttribute('id', `page-${i}`);

      pageLink.addEventListener('click', function () {
        currentPage = i;
        showPage(i);
      });

      pagination.appendChild(pageLink);
    }

    const previousButton = document.getElementById('previous-button');
    const nextButton = document.getElementById('next-button');

    previousButton.addEventListener('click', function () {
      if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
      }
    });

    nextButton.addEventListener('click', function () {
      if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
      }
    });

    showPage(currentPage);
    container.appendChild(pagination);
  });


function searchtitle() {
  let search = document.getElementById('searchInput');
  filter = search.value;
  console.log(filter);
  ul = document.getElementById('postContainer');
  li = ul.getElementsByTagName('li');

  for (let i = 0; i < li.length; i++) {
    const div = li[i].getElementsByTagName('div')[0];
    const txtValue = div.textContent || div.innerText;
    if (txtValue.indexOf(filter) > -1) {
      li[i].style.display = '';
    } else {
      li[i].style.display = 'none';
    }
  }
}