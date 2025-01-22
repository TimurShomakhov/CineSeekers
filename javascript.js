// Wait for the DOM to load (Timur)
document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "e1db7731774da84825c6ecc635ee0aea"; // Replace with your TMDB API key (Timur)
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  const moviesContainer = document.getElementById("movies");
  const fetchMoviesButton = document.getElementById("fetchMovies");

  // Function to fetch movies from TMDB API (Timur)
  async function fetchMovies() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      displayMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
      moviesContainer.innerHTML =
        "<p class='text-red-500'>Failed to load movies. Please try again later.</p>";
    }
  }

  // Function to display movies on the page (Timur)
  function displayMovies(movies) {
    moviesContainer.innerHTML = ""; // Clear existing content (Timur)
    movies.forEach((movie) => {
      const movieCard = document.createElement("div");
      movieCard.classList.add("bg-white", "shadow-md", "rounded", "p-4");

      movieCard.innerHTML = `
        <img
          src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
          alt="${movie.title}"
          class="w-full rounded mb-4"
        />
        <h2 class="text-lg font-bold">${movie.title}</h2>
        <p class="text-sm text-gray-600">Rating: ${movie.vote_average} / 10</p>
      `;

      moviesContainer.appendChild(movieCard);
    });
  }

  // Add click event listener to the button (Timur)
  fetchMoviesButton.addEventListener("click", fetchMovies);
});



// Section: Popular Movies

// Base URL TMDB API
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"; 

// Size parameter 
const size = "w780"; 

// Popular movie container
const popMovs = document.querySelector('#popular-movie-container');

// Function to append popular movies
const displayPopMovs = (movie, container) => {
    
    // movie card (container for single movie)
    const movCard = document.createElement("div");
    movCard.className = "rounded-md flex flex-col ";
    
    // full image URL
    const poster = `${IMAGE_BASE_URL}${size}${movie.poster_path}`;
    const movImg = document.createElement("img");
    movImg.src = poster;
    movImg.alt = movie.title
    movImg.className = "object-fit"

    const movTitle = document.createElement("h3");
    movTitle.className = "text-lg font-semibold text-gray-900 mb-2"
    movTitle.textContent = movie.title;

    const releaseDate = document.createElement("p");
    releaseDate.className = "font-light text-xs italic"
    releaseDate.textContent = movie.release_date;

    // Append elements to movie card
    movCard.appendChild(movImg);
    movCard.appendChild(movTitle);
    movCard.appendChild(releaseDate);

    // Append movie card
    container.appendChild(movCard);
};

// Function to fetch movies
const fetchPopMovs = async () => {
    try {
        const res = await fetch ('https://api.themoviedb.org/3/movie/popular?api_key=e1db7731774da84825c6ecc635ee0aea&language=en-US&page=1');
        if (!res.ok) throw new Error (`${res.status}. Something went wrong!`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    };
};

// Call function on page load
document.addEventListener("DOMContentLoaded", async () => {
    const data = await fetchPopMovs();
    if (data && data.results) {

        // Load only the top 10 movies
        const top10Movies = data.results.slice(0, 10);
        top10Movies.forEach(movie => displayPopMovs(movie, popMovs));
    } else {
        console.log("No movies to display.");
    }
});

// End of section: Popular Movies