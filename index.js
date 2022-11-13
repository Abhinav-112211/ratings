// d0bf5b2fc36562ea218e5d1f2f75dacd
// /discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22
// https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=d0bf5b2fc36562ea218e5d1f2f75dacd
// 2411
const APIURL =
    "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=d0bf5b2fc36562ea218e5d1f2f75dacd";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search_res = document.getElementById("search_res");
const search = document.getElementById("search");
const total_records = document.getElementById("total_records");
const logo = document.querySelector(".logo");
const movie = document.querySelector('.movie-info');
getMovies(APIURL);

async function getMovies(url) {
    const response = await fetch(url);
    const respData = await response.json();
    console.log(respData);

    if (respData.results.length == 0) {
        search_res.innerHTML = "No Result Found";
        total_records.innerHTML = "";
    } else {
        total_records.innerHTML = "Total Results " + respData.total_results;
    }
    showMovies(respData.results);
}

function showMovies(movies) {
    main.innerHTML = "";
    movies.forEach((movie) => {
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        if (movie.poster_path != null) {
            poster_path = IMGPATH + movie.poster_path;
        } else {
            poster_path =
                "https://www.rabrotech.com/upload/default/image-not-found.png";
        }
        movieEl.innerHTML =
            "<img src=" +
            poster_path +
            '><div class="movie-info"><h3>' +
            movie.title +
            "</h3><span class=" +
            getClassByRate(movie.vote_average) +
            ">" +
            movie.vote_average +
            "</span></div>";
        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 7.5) {
        return "green";
    } else if (vote >= 5) {
        return "yellow";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
        search.value = searchTerm;
        search_res.innerHTML = "Search Results For " + searchTerm;
    } else {
        getMovies(APIURL);
    }
});

logo.addEventListener('click', function (e) {
    // main.innerHTML = "";
    getMovies(APIURL);
})