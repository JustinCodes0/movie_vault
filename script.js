class Movie {
  constructor() {
    this.title = "";
    this.description = "";
    this.movieurl = "";
    this.embedUrl = "";
    this.rating = "";
    this.year = new Date().getFullYear();
    this.imageUrl = "";
  }
}

function extractVideoID(url) {
  const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/;
  const match = url.match(regex);
  return match ? match[1] : "";
}

function addMovie() {
  const movieTitle = document.getElementById("movie_title").value;
  const movieDescription = document.getElementById("m_description").value;
  const uploadUrl = document.getElementById("mlink").value;
  const movieRating = document.getElementById("rating").value;
  const movieYear = document.getElementById("year").value;

  // Extract video ID and create embed URL
  const videoID = extractVideoID(uploadUrl);
  const embedURL = videoID ? `https://www.youtube.com/embed/${videoID}` : "";

  let movie = new Movie();
  movie.title = movieTitle;
  movie.description = movieDescription;
  movie.movieurl = uploadUrl;
  movie.embedUrl = embedURL;
  movie.rating = movieRating;
  movie.year = movieYear;
  movie.imageUrl = `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`; // Get video thumbnail

  // Update existing movie or add new movie
  const submitButton = document.querySelector("#movieForm button");
  const isEditing = submitButton.dataset.editing;

  if (isEditing) {
    localStorage.removeItem(isEditing);
    localStorage.setItem(movie.title, JSON.stringify(movie));
    submitButton.dataset.editing = "";
    submitButton.textContent = "Add Movie"; // Reset button text
  } else {
    localStorage.setItem(movie.title, JSON.stringify(movie));
  }

  displayMovie(movie);

  console.log(`Movie ${isEditing ? "updated" : "added"}: ${movie.title}`);

  document.getElementById("movieForm").reset();
}

function displayMovie(movie) {
  const moviesContainer = document.getElementById("moviesContainer");

  const movieColDiv = document.createElement("div");
  movieColDiv.className = "col-12 col-md-6 col-lg-3 mb-2";
  movieColDiv.id = `movie-${movie.title}`; // Unique ID for deletion

  const movieDiv = document.createElement("div");
  movieDiv.className = "card border-0 equal-div h-100 shadow-sm";

  const topDiv = document.createElement("div");
  topDiv.className = "top-div";

  topDiv.setAttribute("data-bs-toggle", "popover");
  topDiv.setAttribute("data-bs-content", movie.description);
  topDiv.setAttribute("title", movie.title);
  topDiv.setAttribute("data-bs-trigger", "hover");
  topDiv.setAttribute("data-bs-placement", "bottom");

  topDiv.innerHTML = `
    <div style="height: 23rem;">
        <i class="fas fa-arrows-alt float-end bg-light rounded-5 m-2" style="font-size: 20px; color: navy"></i>
        <img
            src="${movie.imageUrl}" 
            alt=""
            style="width: 100%; height: 100%; object-fit: cover;"
        />
    </div>
  `;
  const dropdown = document.createElement("div");
  dropdown.className = "dropdown-menu position-relative";
  dropdown.innerHTML = `
      <ul style="list-style: none; padding: 0; margin: 0;">
          <li class="edit" style="padding: 10px; cursor: pointer;">Edit Movie</li>
          <li class="del" style="padding: 10px; cursor: pointer;">Delete Movie</li>
      </ul>
  `;
  topDiv.appendChild(dropdown);

  const iconEl = topDiv.querySelector(".fa-arrows-alt");
  iconEl.addEventListener("click", function () {
    const dropdown = topDiv.querySelector(".dropdown-menu");
    dropdown.classList.toggle("show");
  });
  // delete movie event listener
  const deleteEl = dropdown.querySelector(".del");
  deleteEl.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this movie?")) {
      // remove bootstrap popover instance
      const popoverInstance = bootstrap.Popover.getInstance(topDiv);
      if (popoverInstance) {
        popoverInstance.dispose();
      }
      movieColDiv.remove();
      localStorage.removeItem(movie.title);
    }
  });

  // edit movie event listener
  const editEl = dropdown.querySelector(".edit");
  editEl.addEventListener("click", function () {
    document.getElementById("movie_title").value = movie.title;
    document.getElementById("m_description").value = movie.description;
    document.getElementById("mlink").value = movie.movieurl;
    document.getElementById("rating").value = movie.rating;
    document.getElementById("year").value = movie.year;

    // Change the button text to "Update Movie"
    const submitButton = document.querySelector("#movieForm button");
    submitButton.textContent = "Update Movie";
    submitButton.dataset.editing = movie.title;
  });
  const bottomDiv = document.createElement("div");
  bottomDiv.className =
    "card-body d-flex flex-column justify-content-center align-items-center mt-4";
  bottomDiv.innerHTML = `
        <h5 class="card-title">${movie.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Year: ${movie.year}</h6>
        <div class="star-rating">Rating: ${generateStars(movie.rating)}</div>
    `;

  movieDiv.appendChild(topDiv);
  movieDiv.appendChild(bottomDiv);
  movieColDiv.appendChild(movieDiv);
  moviesContainer.appendChild(movieColDiv);

  // Initialize Bootstrap popover
  const popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
}

function generateStars(rating) {
  const starCount = Math.min(Math.max(rating, 0), 5);
  let stars = "";
  for (let i = 0; i < starCount; i++) {
    stars += `<i class="fas fa-star text-warning"></i>`;
  }
  return stars;
}

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
      localStorage.removeItem(key);
    }
  }
}

document
  .getElementById("movieForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addMovie();
  });

window.onload = loadMovies;
