class Movie {
  constructor() {
    this.title = "";
    this.des = "";
    this.url = "";
    this.rate = "";
    this.year = new Date().getfullyear();
  }
  addMovieTitle() {
    return this.title;
  }
  addMovieDes() {
    return this.des;
  }
  addMovieUrl() {
    return this.url;
  }
  addMovieRate() {
    return this.rate;
  }
  addMovieYear() {
    return this.year;
  }
}

function addMovie() {
  const movieTitle = document.getElementById("title").value;
  const movieDes = document.getElementById("des").value;
  const movieUrl = document.getElementById("url").value;
  const movieRate = document.getElementById("rate").value;
  const movieYear = document.getElementById("year").value;

  let movie = new Movie();
  movie.title = movieTitle;
  movie.des = movieDes;
  movie.url = movieUrl;
  movie.rate = movieRate;
  movie.year = movieYear;

localStorage.setItem(movie.name, JSON.stringify(movie));
  displayMovie(movie);

  console.log (
    `${movieTitle}, ${movieYear}, ${movieDes}`
  );

  document.getElementById("form-id").reset();

  return movie;
}