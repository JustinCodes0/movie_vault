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
    return match ? match[1] : '';
}

function addMovie() {
    const movieTitle = document.getElementById("movie_title").value;
    const movieDescription = document.getElementById("m_description").value;
    const uploadUrl = document.getElementById("mlink").value;
    const movieRating = document.getElementById("rating").value;
    const movieYear = document.getElementById("year").value;

    const videoID = extractVideoID(uploadUrl);
    const embedURL = videoID ? `https://www.youtube.com/embed/${videoID}` : '';

    let movie = new Movie();
    movie.title = movieTitle;
    movie.description = movieDescription;
    movie.movieurl = uploadUrl;
    movie.embedUrl = embedURL;
    movie.rating = movieRating;
    movie.year = movieYear;
    movie.imageUrl = `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`; // Get video thumbnail

    const submitButton = document.querySelector("#movieForm button");
    const isEditing = submitButton.dataset.editing;
    
    if (isEditing) {
        localStorage.removeItem(isEditing); //removes the old movie
        localStorage.setItem(movie.title, JSON.stringify(movie));
        updateMovieCard(isEditing, movie); //updates the new movie

        // Reset form to "Add Movie" state
        resetForm();
    } else {
        localStorage.setItem(movie.title, JSON.stringify(movie));
        displayMovie(movie);

        // Reset form to be ready for a new entry
        resetForm();
    }

    console.log(`Movie ${isEditing ? 'updated' : 'added'}: ${movie.title}`);
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
        <div style="height: 23rem; position: relative;">
            <i id="dropdown-toggle-${movie.title}" class="fas fa-arrows-alt float-end bg-light rounded-5 m-2" style="font-size: 20px; color: navy; cursor: pointer;"></i>
            <img
                src="${movie.imageUrl}" 
                alt=""
                style="width: 100%; height: 100%; object-fit: cover;"
            />
            <div id="dropdown-menu-${movie.title}" style="display: none; position: absolute; top: 9%; right: 0; background: white; border: 1px solid #ccc; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); z-index: 1000;">
                <ul style="list-style: none; padding: 0; margin: 0;">
                    <li class="edit" style="padding: 5px; cursor: pointer;">Edit Movie</li>
                    <li class="del" style="padding: 5px; cursor: pointer;">Delete Movie</li>
                </ul>
            </div>

<style>
    #dropdown-menu-${movie.title} li:hover {
        background-color: #f0f0f0; /* Light gray color */
    }
</style>

        </div>
    `;

    movieDiv.appendChild(topDiv);

    const bottomDiv = document.createElement("div");
    bottomDiv.className = "card-body d-flex flex-column justify-content-center align-items-center mt-4";
    bottomDiv.innerHTML = `
        <h5 class="card-title">${movie.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Year: ${movie.year}</h6>
        <div class="star-rating">Rating: ${generateStars(movie.rating)}</div>
    `;

    movieDiv.appendChild(bottomDiv);
    movieColDiv.appendChild(movieDiv);
    moviesContainer.appendChild(movieColDiv);

    // Initialize Bootstrap popover
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Add event listener for dropdown menu
    const toggle = document.getElementById(`dropdown-toggle-${movie.title}`);
    const menu = document.getElementById(`dropdown-menu-${movie.title}`);

    if (toggle && menu) {
        toggle.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent event bubbling
            menu.style.display = menu.style.display === 'none' || menu.style.display === '' ? 'block' : 'none';
        });

        // Optional: Close the dropdown if clicking outside of it
        document.addEventListener('click', (event) => {
            if (!toggle.contains(event.target) && !menu.contains(event.target)) {
                menu.style.display = 'none';
            }
        });

        // Delete movie event listener
        const deleteEl = menu.querySelector(".del");
        deleteEl.addEventListener("click", function () {
            if (confirm("Are you sure you want to delete this movie?")) {
                // Remove bootstrap popover instance
                const popoverInstance = bootstrap.Popover.getInstance(topDiv);
                if (popoverInstance) {
                    popoverInstance.dispose();
                }
                movieColDiv.remove();
                localStorage.removeItem(movie.title);
            }
        });

        // Edit movie event listener
        const editEl = menu.querySelector(".edit");
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
    }
}

function updateMovieCard(oldTitle, movie) {
    const movieCard = document.getElementById(`movie-${oldTitle}`);
    
    if (movieCard) {
        // Update card ID and content
        movieCard.id = `movie-${movie.title}`;
        
        const img = movieCard.querySelector("img");
        const titleEl = movieCard.querySelector(".card-title");
        const yearEl = movieCard.querySelector(".card-subtitle");
        const starsEl = movieCard.querySelector(".star-rating");
        const topDiv = movieCard.querySelector(".top-div");

        img.src = movie.imageUrl;
        titleEl.textContent = movie.title;
        yearEl.textContent = `Year: ${movie.year}`;
        starsEl.innerHTML = generateStars(movie.rating);

        // Update popover content
        topDiv.setAttribute("data-bs-content", movie.description);
        topDiv.setAttribute("title", movie.title);
    }
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

function resetForm() {
    // Reset form fields
    document.getElementById("movieForm").reset();

    // Reset button text and state
    const submitButton = document.querySelector("#movieForm button");
    submitButton.textContent = "Add Movie"; // Ensure button text is reset
    submitButton.dataset.editing = ""; // Ensure editing state is cleared
}

document.getElementById("movieForm").addEventListener("submit", function (event) {
    event.preventDefault();
    addMovie();
});

window.onload = loadMovies;
