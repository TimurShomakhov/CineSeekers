// Section: Popular Movies

// API-KEY
const API_KEY = 'DEIN_API_KEY';

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
        const res = await fetch (API_URL);
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