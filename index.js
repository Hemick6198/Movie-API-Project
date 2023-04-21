// http://www.omdbapi.com/?i=tt3896198&apikey=23587054
const API_KEY = '23587054';
let moviesListEl = document.querySelector('.movies');
let moviesData = {};
let searchIcon = document.querySelector('.search__icon');

// Search API function
async function searchMovies(searchTerm) {
  const showSpinner = document.querySelector(`.movies__loading`)
  const movies = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
  moviesData = await movies.json();
  showSpinner.classList += ' loading-spinner'
  await timeout(1000);
  showSpinner.classList.remove('loading-spinner')
  moviesListEl.innerHTML = moviesData.Search.map(movie => movieHTML(movie)).join('');
}

// Fetch movie data if not found then sort function
async function sortMovies(filter) {
  if(!moviesData) {
          moviesData = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
      }

  if(filter === 'OLDEST') {
        moviesData.Search.sort((a, b) => a.Year - b.Year);
        moviesListEl.innerHTML = moviesData.Search.map(movie => movieHTML(movie)).join('');
      }

    else if(filter === 'NEWEST') {
        moviesData.Search.sort((a, b) => b.Year - a.Year);
        moviesListEl.innerHTML = moviesData.Search.map(movie => movieHTML(movie)).join('');
      }
}

// Add event listener to submit input
const searchFormEl = document.querySelector('.search-form');
const searchInputEl = searchFormEl.querySelector('.search-input');
searchFormEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = searchInputEl.value;
  searchMovies(searchTerm);
});

// Add event listener to search icon button
searchIcon.addEventListener('click', () => {
  const searchTerm = document.querySelector('.search-input').value;
  searchMovies(searchTerm);
});

// Selects filter type
function filter(event) {
  sortMovies(event.target.value);
}

// defines timeout
function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Opens and closes the hamburger menu
function openMenu() {
  document.body.classList += "menu--open"
}

function closeMenu() {
  document.body.classList.remove('menu--open')
}

// Returns data to inside the HTML
function movieHTML(movie) {
  return `
    <div class="movie">
      <figure class="movie__img--wrapper">
        <img class="movie__img" src="${movie.Poster}" alt="">
      </figure>
      <ul class="movie__description">
          <li class="movie__title">
              Title: ${movie.Title}
          </li>
          <li class="movie__year">
              Year: ${movie.Year}
          </li>
          <li class="movie__type">
              Type: ${movie.Type}
          </li>
      </ul>
    </div>
  `;
}