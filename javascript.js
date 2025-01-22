// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "e1db7731774da84825c6ecc635ee0aea"; // Replace with your TMDB API key
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
            moviesContainer.innerHTML =
                "<p class='text-red-500'>Failed to load movies. Please try again later.</p>";
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
    // fetchMoviesButton.addEventListener("click", fetchMovies);
});

// Section: Popular Movies

// Base URL TMDB API
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

// Size parameter
const size = "w780";

// Popular movie container
const popMovs = document.querySelector("#popular-movie-container");

// Function to append popular movies
const displayPopMovs = (movie, container) => {
    // movie card (container for single movie)
    const movCard = document.createElement("div");
    movCard.className = "rounded-md flex flex-col ";

    // full image URL
    const poster = `${IMAGE_BASE_URL}${size}${movie.poster_path}`;
    const movImg = document.createElement("img");
    movImg.src = poster;
    movImg.alt = movie.title;
    movImg.className = "object-fit";

    const movTitle = document.createElement("h3");
    movTitle.className = "text-lg font-semibold text-gray-900 mb-2";
    movTitle.textContent = movie.title;

    const releaseDate = document.createElement("p");
    releaseDate.className = "font-light text-xs italic";
    releaseDate.textContent = movie.release_date;

    // Append elements to movie card
    movCard.appendChild(movImg);
    movCard.appendChild(movTitle);
    movCard.appendChild(releaseDate);

    // Append movie card
    container.appendChild(movCard);
};

// Section: Popular Movies

// Function to fetch movies
const fetchPopMovs = async () => {
    try {
        const res = await fetch(
            "https://api.themoviedb.org/3/movie/popular?api_key=e1db7731774da84825c6ecc635ee0aea&language=en-US&page=1"
        );
        if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

// Call function on page load
document.addEventListener("DOMContentLoaded", async () => {
    const data = await fetchPopMovs();
    if (data && data.results) {
        // Load only the top 10 movies
        const top10Movies = data.results.slice(0, 10);
        top10Movies.forEach((movie) => displayPopMovs(movie, popMovs));
    } else {
        console.log("No movies to display.");
    }
});

// End of section: Popular Movies

// Start Section search results: Search results

const renderResults = (results) => {
    console.log("Rendering Results:", results); // Debug-Ausgabe
    const resultsContainer = document.querySelector("#resultCards");
    resultsContainer.innerHTML = ""; // Clear existing content

    results.forEach((result) => {
        console.log("Rendering Movie:", result); // Zeigt jedes einzelne Resultat
        const resultItem = document.createElement("div");
        resultItem.classList = "bg-white rounded-lg p-4 flex gap-4";

        // Erstelle Inhalte...
        const imgContainer = document.createElement("div");
        imgContainer.classList = "flex-shrink-0 mx-auto md:mx-0";
        const img = document.createElement("img");
        img.classList = "max-h-48 w-auto rounded-md";
        img.src = result.poster_path
            ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
            : "https://via.placeholder.com/150";
        img.alt = result.title;
        imgContainer.appendChild(img);

        const resultContent = document.createElement("div");
        resultContent.classList = "flex-1";

        const resultTitle = document.createElement("h3");
        resultTitle.classList = "text-lg font-semibold text-gray-900 mb-2";
        resultTitle.textContent = result.title;

        resultContent.appendChild(resultTitle);
        resultItem.appendChild(imgContainer);
        resultItem.appendChild(resultContent);

        resultsContainer.appendChild(resultItem);
    });
};

// Search logic
document.addEventListener("DOMContentLoaded", () => {
    const API_KEY = "e1db7731774da84825c6ecc635ee0aea"; // Your TMDB API Key
    const resultsSection = document.getElementById("results-section");
    const resultsContainer = document.getElementById("resultCards");
    const searchInput = document.getElementById("search");
    const searchBtn = document.getElementById("searchBtn");

    // Function to search for keywords
    const fetchKeywordResults = async (query) => {
        const API_URL = `https://api.themoviedb.org/3/search/keyword?api_key=${API_KEY}&query=${encodeURIComponent(
            query
        )}`;
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(
                    `Error fetching keyword results. Status: ${response.status}`
                );
            }
            const data = await response.json();
            console.log("Keyword Search Results:", data);
            return data.results;
        } catch (error) {
            console.error("Error fetching keyword search results:", error);
            return [];
        }
    };

    // Function to fetch movies based on a keyword ID
    const fetchMoviesByKeyword = async (keywordId) => {
        const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_keywords=${keywordId}`;
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(
                    `Error fetching movies for keyword. Status: ${response.status}`
                );
            }
            const data = await response.json();
            console.log("Movies for Keyword:", data);
            return data.results;
        } catch (error) {
            console.error("Error fetching movies by keyword:", error);
            return [];
        }
    };

    // Function to render movies on the page
    const renderResults = (results) => {
        console.log("Rendering Results:", results); // Debugging output
        resultsContainer.innerHTML = ""; // Clear existing content

        results.forEach((result) => {
            const resultItem = document.createElement("div");
            resultItem.classList = "bg-white rounded-lg p-4 flex gap-4";

            // Create and append movie poster
            const imgContainer = document.createElement("div");
            imgContainer.classList = "flex-shrink-0 mx-auto md:mx-0";
            const img = document.createElement("img");
            img.classList = "max-h-48 w-auto rounded-md";
            img.src = result.poster_path
                ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                : "https://via.placeholder.com/150";
            img.alt = result.title || "No title";
            imgContainer.appendChild(img);

            // Create and append movie details
            const resultContent = document.createElement("div");
            resultContent.classList = "flex-1";

            const resultTitle = document.createElement("h3");
            resultTitle.classList = "text-lg font-semibold text-gray-900 mb-2";
            resultTitle.textContent = result.title || "No title";

            const resultOverview = document.createElement("p");
            resultOverview.classList = "text-sm text-gray-700 leading-relaxed";
            resultOverview.textContent =
                result.overview || "No overview available.";

            resultContent.appendChild(resultTitle);
            resultContent.appendChild(resultOverview);

            resultItem.appendChild(imgContainer);
            resultItem.appendChild(resultContent);

            resultsContainer.appendChild(resultItem);
        });
    };

    // Function to handle search and render results
    const handleSearch = async () => {
        const query = searchInput.value.trim(); // Get the search query
        console.log("Search Query:", query); // Debugging output

        if (!query) {
            alert("Please enter a valid search term!");
            return;
        }

        // Fetch keywords matching the query
        const keywordResults = await fetchKeywordResults(query);
        if (!keywordResults.length) {
            resultsContainer.innerHTML = `<p class='text-red-500'>No results found for "${query}".</p>`;
            return;
        }

        // Fetch movies based on the first keyword result
        const keywordId = keywordResults[0].id;
        const movies = await fetchMoviesByKeyword(keywordId);

        if (movies.length === 0) {
            resultsContainer.innerHTML = `<p class='text-red-500'>No movies found for the keyword "${query}".</p>`;
        } else {
            renderResults(movies); // Render the fetched movies
        }

        // Show the results section
        resultsSection.classList.remove("hidden");
    };
    // Allow "Enter" key to trigger search
    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSearch();
        }
    });

    // Allow click to trigger search
    searchBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent form submission
        handleSearch();
    });
});

// Dummy Data
// const testResults = [
//     {
//         title: "Movie 1",
//         poster_path: "/2E1x1qcHqGZcYuYi4PzVZjzg8IV.jpg",
//         overview: "This is the overview for Movie 1.",
//     },
//     {
//         title: "Movie 2",
//         poster_path: null, // Kein Bild vorhanden
//         overview: "This is the overview for Movie 2.",
//     },
// ];
// document.addEventListener("DOMContentLoaded", () => {
//     renderResults(testResults);
// });
