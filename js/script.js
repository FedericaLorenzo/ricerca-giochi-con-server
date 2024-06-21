//Leggere il readme.md che si trova nella cartella serverGames

class Game {
    constructor({ id, name, genre, developer, publisher, releaseDate, description, image, summary, rating }) {
        this.id = id;
        this.name = name;
        this.genre = genre;
        this.developer = developer;
        this.publisher = publisher;
        this.releaseDate = releaseDate;
        this.description = description;
        this.image = image;
        this.summary = summary;
        this.rating = rating;
    }

    //non ho capito come andava usato questo metodo passando l'id
    getGameStarsRating() {
        const ratingValue = this.rating;
        const ratingPercentage = Math.ceil((ratingValue / 5) * 100);
        return ratingPercentage;
    }
}


class BackendServices {
    constructor() {
        this.baseUrl = "http://localhost:3001/games"
        this.games = []
    }

    getGames(callback) {
        fetch(this.baseUrl, {})
            .then(res => res.json())
            .then(data => {
                data.result.forEach(game => {
                    const newGame = new Game(game);
                    console.log(newGame)
                    this.games.push(newGame);
                });
                callback(this.games);
            })
    }

    getSingleGame(callback, id) {

        fetch(`${this.baseUrl}/${id}`, {})
            .then(res => res.json())
            .then(data => {
                const newGame = new Game(data.result);
                callback(newGame);
            })
    }
}

class Modal {
    constructor() {
        this.imageHTML = document.querySelector('.modal-img');
        this.genreHTML = document.querySelector('.modal-genre');
        this.developerHTML = document.querySelector('.modal-developer');
        this.nameHTML = document.querySelector('.modal-name');
        this.publisherHTML = document.querySelector('.modal-publisher');
        this.summaryHTML = document.querySelector('.modal-summary');
        this.starRating = document.querySelector('.modal .fill-ratings');
    }

    populateModal(game, modal) {
        const { image, name, publisher, genre, developer, summary } = game;
        this.imageHTML.src = image;
        this.imageHTML.alt = name;
        this.genreHTML.innerHTML = genre;
        this.developerHTML.innerHTML = developer;
        this.nameHTML.innerHTML = name;
        this.publisherHTML.innerHTML = publisher;
        this.summaryHTML.innerHTML = summary;
        this.starRating.style.width = game.getGameStarsRating() + "%";
        modal.classList.add('modal--open');
    }

}



class Print {
    constructor() {
        this.container = document.querySelector('.games-row');
    }


    printGames(data) {

        data.forEach(game => {
            const { image, name, publisher, description, id, genre, developer } = game;

            let template = '';
            template = `<div class="col mb-5">
                            <div class="card h-100">
                            <img src="${image}" class="card-img-top" alt="${name}" />
                            <div class="card-body d-flex flex-column justify-content-between">
                                <h2 class="card-title fs-5">${name}</h2>
                                <h3 class="fs-6">${publisher}</h3>

                                <p class="card-text">${description}</p>
                                <p class="card-details">
                                <span class="badge text-bg-info">New</span>
                                <span class="badge text-bg-light">${genre}</span>
                                <span class="badge text-bg-light">${developer}</span>
                                </p>
                                <div class="btn btn-primary btn--view-more" data-id="${id}">View More details</div>
                            </div>
                            </div>
                        </div>`

            this.container.innerHTML += template;
        });

        const viewMoreButtons = document.querySelectorAll('.btn--view-more');
        const modal = document.querySelector('.modal');
        const closeButton = document.querySelector('.modal-close');

        viewMoreButtons.forEach(button => {
            button.addEventListener('click', function () {
                let id = this.getAttribute('data-id');
                const backendServices = new BackendServices();
                const openModal = new Modal();
                backendServices.getSingleGame((game) => openModal.populateModal(game, modal), id);
            })
        });

        closeButton.addEventListener('click', function () {
            modal.classList.remove('modal--open');
        })

    }
}



document.addEventListener('DOMContentLoaded', function () {
    const backendServices = new BackendServices();
    const print = new Print();
    backendServices.getGames(data => print.printGames(data))

}
)