<<<<<<< HEAD
class Movie {
  constructor(title, des, url, rate, year) {
    this.title = title;
    this.des = des;
    this.url = url;
    this.rate = rate;
    this.year = year;
=======

class Movie {
  constructor() {
      this.title = "";
      this.description = "";
      this.movieurl = "";
      this.embedUrl = "";
      this.rating = "";
      this.year = new Date().getFullYear();
>>>>>>> 776c5683cf6a35444518b582bd482a750dd2a9b1
  }
}

function addMovie() {
<<<<<<< HEAD
  const movieTitle = document.getElementById("title").value;
  const movieDes = document.getElementById("des").value;
  const movieUrl = document.getElementById("url").value;
  const movieRate = document.getElementById("rate").value;
  const movieYear = document.getElementById("year").value;

  let movie = new Movie(movieTitle, movieDes, movieUrl, movieRate, movieYear);
  localStorage.setItem(movie.title, JSON.stringify(movie));
  displayMovie(movie);

  document.getElementById("form-id").reset();
=======
  const movieTitle = document.getElementById("movie_title").value;
  const movieDescription = document.getElementById("m_description").value;
  const uploadUrl = document.getElementById("mlink").value;
  const movieRating = document.getElementById("rating").value;
  const movieYear = document.getElementById("year").value;

  const videoID = uploadUrl.split("/").pop();
  const embedURL = `https://www.youtube.com/embed/${videoID}`;

  let movie = new Movie();
  movie.title = movieTitle;
  movie.description = movieDescription;
  movie.movieurl = uploadUrl;
  movie.embedUrl = embedURL;
  movie.rating = movieRating;
  movie.year = movieYear;


  // Update existing movie
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

  console.log(`Movie ${isEditing ? 'updated' : 'added'}: ${movie.title}`);

  document.getElementById("movieForm").reset();
>>>>>>> 776c5683cf6a35444518b582bd482a750dd2a9b1
}

function displayMovie(movie) {
  const moviesContainer = document.getElementById("moviesContainer");
<<<<<<< HEAD
  let rows = moviesContainer.getElementsByClassName("row");
  let lastRow = rows[rows.length - 1];

  if (!lastRow || lastRow.children.length >= 4) {
    lastRow = document.createElement("div");
    lastRow.className = "row mt-1";
    moviesContainer.appendChild(lastRow);
  }

  const moviesColDiv = document.createElement("div");
  moviesColDiv.className = "col-12 col-md-6 col-lg-3 mb-2";
  const moviesDiv = document.createElement("div");
  const topDiv = document.createElement("div");
  const bottomDiv = document.createElement("div");
  moviesDiv.className = "card border-0 equal-div h-100 m-1 shadow-sm";
  topDiv.className = "top-div";
  topDiv.style.backgroundImage = `url('${movie.url}')`;
  topDiv.style.backgroundSize = "cover";
  topDiv.style.backgroundPosition = "center";
  topDiv.style.backgroundRepeat = "no-repeat";

  topDiv.innerHTML = `
    <div style="height: 23rem;">
      <i class="fas fa-arrows-alt float-end text-success bg-light rounded-5 m-2" style="font-size: 20px"></i>
    </div>
  `;

  const dropdown = document.createElement("div");
  dropdown.style.position = "absolute";
  dropdown.style.top = "30px";
  dropdown.style.right = "10px";
  dropdown.style.backgroundColor = "black";
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
  const dropdown = topDiv.querySelector(".dropdown");
  dropdown.classList.toggle("show"); // Toggle the dropdown visibility
});


  const deleteEl = topDiv.querySelector(".del");
  deleteEl.addEventListener("click", function () {
    localStorage.removeItem(movie.title); // Remove from local storage
    moviesDiv.remove(); // Remove from the DOM
  });

  const editEl = topDiv.querySelector(".edit");
  editEl.addEventListener("click", function () {
    editMovie(movie);
  });

  bottomDiv.innerHTML = `
    <div class="card-body d-flex flex-column justify-content-center align-items-center">
      <h5 class="card-title">${movie.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${movie.year}</h6>
      <p class="card-text d-none">${movie.des}</p>
    </div>
  `;
  moviesColDiv.appendChild(moviesDiv);
  moviesDiv.appendChild(topDiv);
  moviesDiv.appendChild(bottomDiv);

  lastRow.appendChild(moviesColDiv);

  moviesDiv.addEventListener("mouseover", () => {
    bottomDiv.querySelector(".card-text").classList.remove("d-none");
  });

  moviesDiv.addEventListener("mouseout", () => {
    bottomDiv.querySelector(".card-text").classList.add("d-none");
  });
=======

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
          <iframe
              src="${movie.embedUrl}"
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
  bottomDiv.className = "card-body d-flex flex-column justify-content-center align-items-center mt-4";
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
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
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
>>>>>>> 776c5683cf6a35444518b582bd482a750dd2a9b1
}

function loadMovies() {
  for (let i = 0; i < localStorage.length; i++) {
<<<<<<< HEAD
    const key = localStorage.key(i); // Get the key
    const movieData = localStorage.getItem(key); // Get the data
    try {
      const movie = JSON.parse(movieData); 
      if (movie && movie.title && movie.des && movie.year && movie.rate && movie.url) {
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

function editMovie(movie) {
  document.getElementById("title").value = movie.title;
  document.getElementById("des").value = movie.des;
  document.getElementById("url").value = movie.url;
  document.getElementById("rate").value = movie.rate;
  document.getElementById("year").value = movie.year;

  localStorage.removeItem(movie.title); 


  document.getElementById("button-4").textContent = "Update Movie";
}

function searchMovies() {
  const searchTerm = document.getElementById("input-1").value.toLowerCase();
  const moviesContainer = document.getElementById("moviesContainer");
  moviesContainer.innerHTML = ""; 

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const movieData = localStorage.getItem(key);
    try {
      const movie = JSON.parse(movieData);
      if (movie.title.toLowerCase().includes(searchTerm)) {
        displayMovie(movie);
      }
    } catch (e) {
      console.error(`Error parsing JSON for key "${key}":`, e);
    }
  }
}

document.getElementById("button-2").addEventListener("click", searchMovies);

window.onload = loadMovies;
=======
      const key = localStorage.key(i);
      const movieData = localStorage.getItem(key);
      try {
          const movie = JSON.parse(movieData);
          if (movie && movie.title && movie.description && movie.movieurl && movie.embedUrl && movie.rating && movie.year) {
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

document.getElementById("movieForm").addEventListener("submit", function (event) {
  event.preventDefault();
  addMovie();
});

window.onload = loadMovies;
>>>>>>> 776c5683cf6a35444518b582bd482a750dd2a9b1
