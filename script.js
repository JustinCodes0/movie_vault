class Movie {
  constructor() {
    this.title = "";
    this.description = "";
    this.movieurl = "";
    this.embedUrl = "";
    this.rating = "";
    this.year = new Date().getFullYear();
  }
}

function addMovie() {
  const movieTitle = document.getElementById("movie_title").value;
  const moviedescription = document.getElementById("m_description").value;
  const uploadUrl = document.getElementById("mlink").value;
  const movieRating = document.getElementById("rating").value;
  const movieYear = document.getElementById("year").value;

  const videoID = uploadUrl.split("/").pop();
  const embedURL = `https://www.youtube.com/embed/${videoID}`;

  let movie = new Movie();
  movie.title = movieTitle;
  movie.description = moviedescription;
  movie.movieurl = uploadUrl;
  movie.embedUrl = embedURL; // Embedded URL
  movie.rating = movieRating;
  movie.year = movieYear;

  localStorage.setItem(movie.title, JSON.stringify(movie));
  // console.log(localStorage.getItem(book));
  displayMovie(movie);

  console.log(
    `this movie is title ${movieTitle}: here' a description of it : ${moviedescription} it was released in the year: ${movieYear} here is the url ${movie.movieurl}.`
  );

  // Clear the form fields after adding the book
  document.getElementById("movieForm").reset();

  return movie;
}

// Function to display the movies

function displayMovie(movie) {
  const moviesContainer = document.getElementById("moviesContainer");
  const movieRating = document.getElementById("rating").value;
  const uploadUrl = document.getElementById("mlink").value;

  let rows = moviesContainer.getElementsByClassName("row");
  let lastRow = rows[rows.length - 1];
  const movieRate = Number(movieRating);
  // let videoID = uploadUrl.split("/").pop();
  const embedURL = movie.embedUrl; // Use embedded URL from movie objec

  for (i = 0; i <= movieRate; i++) {}

  if (!lastRow || lastRow.children.length >= 4) {
    lastRow = document.createElement("div");
    lastRow.className = "row mt-1";
    moviesContainer.appendChild(lastRow);
  }

  const movieColDiv = document.createElement("div");
  movieColDiv.className = "col-12 col-md-6 col-lg-3 mb-2 ";
  const movieDiv = document.createElement("div");
  const topDiv = document.createElement("div");
  const bottomDiv = document.createElement("div");
  movieDiv.className = "card border-0 equal-div h-100 shadow-sm ";
  topDiv.className = "top-div";

  // Add data attributes for Bootstrap popover
  topDiv.setAttribute("data-bs-toggle", "popover");
  topDiv.setAttribute("data-bs-content", movie.description);
  topDiv.setAttribute("title", movie.title);
  topDiv.setAttribute("data-bs-trigger", "hover");
  topDiv.setAttribute("data-bs-placement", "bottom");
  topDiv.innerHTML = `
  <div style="height: 23rem;">
   <i class="fas fa-arrows-alt float-end bg-light rounded-5 m-2" style="font-size: 20px; color: navy"></i>
    <iframe
      src="${embedURL}"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
      style="width: 100%; height: 100%;"
    ></iframe>
   
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
    localStorage.removeItem(movie.title);
    movieDiv.remove();
  });

  bottomDiv.innerHTML = `
  <div class="card-body d-flex flex-column justify-content-center align-items-center mt-4 ">
  
                    <h5 class="card-title">${movie.title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Year: (${
                      movie.year
                    })</h6>
                    <div class="star-rating">Rating: ${generateStars(
                      movie.rating
                    )}</div>
                  
                </div>
  
  `;
  movieColDiv.appendChild(movieDiv);
  movieDiv.appendChild(topDiv);
  movieDiv.appendChild(bottomDiv);

  document.getElementById("moviesContainer").appendChild(movieColDiv);
  lastRow.appendChild(movieColDiv);

  movieDiv.addEventListener("mouseover", () => {
    bottomDiv.querySelector(".card-text").classList.remove("d-none");
  });

  movieDiv.addEventListener("mouseout", () => {
    bottomDiv.querySelector(".card-text").classList.add("d-none");
  });

  // Initialize Bootstrap popover
  const popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
}
//  end of displayMovies function
// Function to generate stars
function generateStars(rating) {
  const starCount = Math.min(Math.max(rating, 0), 5); //Set the rating between 0 - 5
  let stars = "";
  for (let i = 0; i < starCount; i++) {
    stars += `<i class="fas fa-star text-warning"></i>`;
  }
  return stars;
}
// generate stars function ends
// Load Movies Function begins

function loadMovies() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const movieData = localStorage.getItem(key);
    try {
      const movie = JSON.parse(movieData);
      if (
        movie &&
        movie.title &&
        movie.description &&
        movie.movieurl &&
        movie.embedUrl &&
        movie.rating &&
        movie.year
      ) {
        displayMovie(movie);
      } else {
        console.warn(`Invalid movie data for key "${key}":`, movie);
      }
    } catch (e) {
      console.error(`Error parsing JSON for key "${key}":`, e);
      // Optionally, remove the invalid entry from local storage
      localStorage.removeItem(key);
    }
  }
}

// Load movies function ends
document
  .getElementById("movieForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addMovie();
  });

window.onload = loadMovies;
