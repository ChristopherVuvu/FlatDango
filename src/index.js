// Access DOM details from HTML
const banner = document.getElementById("poster");
const titleName = document.getElementById("films");
const filmName = document.getElementById("title");
const aboutMovie = document.getElementById("film-info");
const runtime = document.getElementById("runtime");
const showtime = document.getElementById("showtime");
const remainingTickets = document.getElementById("ticket-num");
const ticketsButton = document.getElementById("buy-ticket");

//picking the movie details from the available data
function addFilm(film) {
    banner.src = film.poster;
    banner.alt = film.title;
    titleName.innerHTML = film.title;
    filmName.innerHTML = film.title;
    aboutMovie.innerHTML = film.description;
    runtime.innerHTML = film.runtime;
    showtime.innerHTML = film.showtime;
    remainingTickets.innerHTML = film.capacity - film.tickets_sold;
}

//fetching json data via URL
fetch("http://localhost:3000/films/1")
    .then((response) => response.json())
    .then(addFilm);
//Add Movie details
function movieName(films) {
    films.forEach((film) => {
    const name = document.createElement("li");
    name.innerText = film.title;
    name.setAttribute("id", `${film.id}`);
    titleName.appendChild(name);
    name.addEventListener("click", () => {
        banner.src = film.poster;
        banner.alt = film.title;
        filmName.innerHTML = film.title;
        aboutMovie.innerHTML = film.description;
        runtime.innerHTML = film.runtime;
        showtime.innerHTML = film.showtime;
        remainingTickets.innerHTML = film.capacity - film.tickets_sold;
        });
    });
}
fetch("http://localhost:3000/films")
    .then((response) => response.json())
    .then(movieName);
//Buy tickets for the show
function ticketsButtonHandler() {
    ticketsButton.addEventListener("click", () => {
    let remainingTicketsNo = parseInt(remainingTickets.innerHTML);
    if (remainingTicketsNo > 0) {
        remainingTickets.innerHTML = remainingTickets.innerHTML - 1;
    } else {
        ticketsButton.textContent = "Sold Out";
        setTimeout(() => alert("NO AVAILABLE TICKETS!!"), 100);
    }
    });
}
ticketsButtonHandler();