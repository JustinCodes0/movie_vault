class Movie {
  constructor(title, des, url, rate, year) {
    this.title = title;
    this.des = des;
    this.url = url;
    this.rate = rate;
    this.year = year;
  }
}

function addMovie() {
  const movieTitle = document.getElementById("title").value;
  const movieDes = document.getElementById("des").value;
  const movieUrl = document.getElementById("url").value;
  const movieRate = document.getElementById("rate").value;
  const movieYear = document.getElementById("year").value;

  let movie = new Movie(movieTitle, movieDes, movieUrl, movieRate, movieYear);
  localStorage.setItem(movie.title, JSON.stringify(movie));
  displayMovie(movie);

  document.getElementById("form-id").reset();
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
}

function loadMovies() {
  for (let i = 0; i < localStorage.length; i++) {
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