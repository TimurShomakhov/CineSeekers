// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "API Key Goes Here"; // Replace with your TMDB API key
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  const moviesContainer = document.getElementById("movies");
  const fetchMoviesButton = document.getElementById("fetchMovies");

  // Function to fetch movies from TMDB API
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
      moviesContainer.innerHTML = "<p class='text-red-500'>Failed to load movies. Please try again later.</p>";
    }
  }

  // Function to display movies on the page
  function displayMovies(movies) {
    moviesContainer.innerHTML = ""; // Clear existing content
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

  // Add click event listener to the button
  fetchMoviesButton.addEventListener("click", fetchMovies);
});
