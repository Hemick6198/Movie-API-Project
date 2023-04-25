// http://www.omdbapi.com/?i=tt3896198&apikey=23587054
const API_KEY = "23587054";

const moviesListEl = document.querySelector(".movies");
const spinnerEl = document.querySelector(".loading-spinner");
const searchFormEl = document.querySelector(".search-form");
const searchInputEl = searchFormEl.querySelector(".search-input");
const searchIcon = document.querySelector(".search__icon");
const filterSelectEl = document.getElementById("filter");
let moviesData = {};
hideSpinner();

// Search API function
async function fetchMovies(searchTerm) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`
  );
  return await response.json();
  }

// Loads the movies and renders them
async function searchMovies(searchTerm) {
  showSpinner();
  moviesData = await fetchMovies(searchTerm);
  await timeout(1000);
  hideSpinner();
  renderMovies();
  document.getElementById("filter").selectedIndex = 0;
}

// pushes movie list to html
function renderMovies() {
  if (moviesData.Search) {
    moviesListEl.innerHTML = moviesData.Search.map((movie) =>
      movieHTML(movie)
    ).join("");
  }
}

// Filters by year and resets the drop-down to re-sort easily
async function sortMovies(filter) {
  if (!moviesData.Search) return;

  if (filter === "OLDEST") {
    moviesData.Search.sort(
      (a, b) =>
        parseInt(a.Year.substring(0, 4)) - parseInt(b.Year.substring(0, 4))
    );
    moviesListEl.innerHTML = moviesData.Search.map((movie) =>
      movieHTML(movie)
    ).join("");
  } else if (filter === "NEWEST") {
    moviesData.Search.sort(
      (a, b) =>
        parseInt(b.Year.substring(0, 4)) - parseInt(a.Year.substring(0, 4))
    );
    moviesListEl.innerHTML = moviesData.Search.map((movie) =>
      movieHTML(movie)
    ).join("");
  }

  renderMovies();
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);
searchIcon.addEventListener("click", handleSearchIconClick);
filterSelectEl.addEventListener("change", handleFilterChange);

async function handleSearchFormSubmit(event) {
  event.preventDefault();
  const searchTerm = searchInputEl.value;
  await searchMovies(searchTerm);
}

async function handleSearchIconClick() {
  const searchTerm = searchInputEl.value;
  await searchMovies(searchTerm);
}

// Selects filter type
function handleFilterChange(event) {
  sortMovies(event.target.value);
}

// Shows loading spinner
function showSpinner() {
  spinnerEl.style.display = "block";
}

// Hides loading spinner
function hideSpinner() {
  spinnerEl.style.display = "none";
}

// Defines timeout
function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Opens and closes the hamburger menu
function openMenu() {
  document.body.classList += "menu--open";
}

function closeMenu() {
  document.body.classList.remove("menu--open");
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
