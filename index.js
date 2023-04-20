// http://www.omdbapi.com/?i=tt3896198&apikey=23587054

const moviesListEl = document.querySelector('.movies');
const API_KEY = '23587054';

async function main(searchTerm) {
    try {
      const movies = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
      if (!movies.ok) {
        throw new Error('Failed to fetch movies from the API.');
      }
      const moviesData = await movies.json();
      console.log(moviesData);
      moviesListEl.innerHTML = moviesData.Search.map(movie => movieHTML(movie)).join('');
    } catch (error) {
      console.error(error);
    }
}

const searchFormEl = document.querySelector('.search-form');
const searchInputEl = searchFormEl.querySelector('.search-input');
searchFormEl.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchTerm = searchInputEl.value;
    main(searchTerm);
});

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