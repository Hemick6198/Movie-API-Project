// http://www.omdbapi.com/?i=tt3896198&apikey=23587054
const API_KEY = '23587054';
let moviesListEl = document.querySelector('.movies');
let movies;
let moviesData = {};

async function main(searchTerm) {
            const movies = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
            const moviesData = await movies.json();
            moviesListEl.innerHTML = moviesData.Search.map(movie => movieHTML(movie)).join('');
}

const searchFormEl = document.querySelector('.search-form');
const searchInputEl = searchFormEl.querySelector('.search-input');
searchFormEl.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchTerm = searchInputEl.value;
    main(searchTerm);
});



async function sortMovies(filter) {
  const moviesWrapper = document.querySelector(`.movies`)
  // const moviesData = {};
  moviesWrapper.classList += ' movies__loading'
  
    if (!moviesData) {
        movies = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
        // const moviesData = await movies.json();
    }
    // console.log(moviesData)
    moviesWrapper.classList.remove('movies__loading')

    if (filter === 'OLDEST') {
        moviesData.Search.sort((a, b) => a.Year - b.Year);
        moviesListEl.innerHTML = moviesData.Search.map(movie => movieHTML(movie)).join('');
      }
    else if (filter === 'NEWEST') {
        moviesData.Search.sort((a, b) => b.Year - a.Year);
        moviesListEl.innerHTML = moviesData.Search.map(movie => movieHTML(movie)).join('');
      }
}

function filter(event) {
    sortMovies(event.target.value);
}


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


function openMenu() {
    document.body.classList += "menu--open"
}

function closeMenu() {
    document.body.classList.remove('menu--open')
}
