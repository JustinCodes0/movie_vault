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

function displayMovie(movie) {
  const moviesContainer = document.getElementById("moviesContainer");
  let rows = moviesContainer.getElementsByClassName("row");
  let lastRow = rows[rows.length - 1];

  if (!lastRow || lastRow.children.length >= 4) {
    lastRow = document.createElement("div");
    lastRow.className = "row mt-1";
    moviesContainer.appendChild(lastRow);
  }

  const moviesColDiv = document.createElement("div");
  moviesColDiv.className = "col-12 col-md-6 col-lg-3 mb-2 ";
  const moviesDiv = document.createElement("div");
  const topDiv = document.createElement("div");
  const bottomDiv = document.createElement("div");
  moviesDiv.className = "card border-0 equal-div h-100 m-1 shadow-sm ";
  topDiv.className = "top-div";
  topDiv.style.backgroundImage = `url('${movie.url}')`;
  topDiv.style.backgroundSize = "url";
  topDiv.style.backgroundPosition = "center";
  topDiv.style.backgroundRepeat = "no-repeat";

  topDiv.innerHTML = `
  <div style="height: 23rem;">
        <i class="fas fa-arrows-alt float-end text-success bg-light rounded-5 m-2" style="font-size: 20px")"></i>

                    </div>
                
  `;

  const dropdown = document.createElement("div");
  dropdown.style.position = "absolute";
  dropdown.style.top = "30px";
  dropdown.style.right = "10px";
  dropdown.style.backgroundColor = "white";
  dropdown.style.border = "1px solid #ccc";
  dropdown.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
  dropdown.style.display = "none";
  dropdown.innerHTML = `
  <ul style="list-style: none; padding: 0; margin: 0;">
    <li class="edit" style="padding: 10px; cursor: pointer;">Edit Movie</li>
    <li class="del" style="padding: 10px; cursor: pointer;">Delete Movie</li>
  </ul>
`;





topDiv.appendChild(dropdown);

const iconEl = topDiv.querySelector(".fa-arrows-alt");
iconEl.addEventListener("click", function () {
  if (dropdown.style.display === "none") {
    dropdown.style.display = "block";
  } else {
    dropdown.style.display = "none";
  }
});

const deleteEl = topDiv.querySelector(".del");

deleteEl.addEventListener("click", function () {
  alert("delete button was click");
  localStorage.removeItem(movie.name);
  moviesDiv.remove();
});

bottomDiv.innerHTML = `
<div class="card-body d-flex flex-column justify-content-center align-items-center ">
  
                <h5 class="card-title">${book.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">by ${book.author} (${book.year})</h6>
                <p class="card-text d-none">${book.summary}</p>
                  
            </div>
  
  `;
  moviesColDiv.appendChild(moviesDiv);
  moviesDiv.appendChild(topDiv);
  moviesDiv.appendChild(bottomDiv);

  document.getElementById("moviesContainer").appendChild(moviesColDiv);
  lastRow.appendChild(moviesColDiv);

  moviesDiv.addEventListener("mousover", () => {
    bottomDiv.querySelector(" card-text").classList.remove("d-none");    
  });

  moviesDiv.addEventListener("mouseout", () => {
    bottomDiv.querySelector(".card-text").classList.add("d-none");
  });
}

function loadMovies() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const moviesData = localStorage.getItem(key);
    // const book = JSON.parse(moviesData);
    try {
      const movie = JSON.parse(moviesData);
      if (
        movie &&
        movie.title &&
        movie.des &&
        movie.year &&
        movie.rate &&
        movie.url
      ) {
        displayBook(movie);
      } else {
        console.warn(`Invalid movie data for key "${key}":`, movie);
      }

      // Display each movie
      displayBook(movie);
    } catch (e) {
      console.error(`Error parsing JSON for key "${key}":`, e);
      // Optionally, remove the invalid entry from local storage
      localStorage.removeItem(key);
    }
  }
}
// Prevent the form from submitting and refreshing the page
document
  .getElementById("form-id")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addMovie();
  });

window.onload = loadMovies;