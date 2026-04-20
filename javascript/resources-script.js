import { cardData } from './card-data.js';

window.addEventListener("DOMContentLoaded", loadedHandler);

function loadedHandler() {

    const cardContainer = document.getElementById("card-container");

    cardData.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("my-card");
        card.dataset.tags = item.dataTags;

        card.innerHTML = `
            <div class="card-content bg-dark border border-light border-3 rounded-5 mb-5 p-5">
                <p class="text-center mb-4">
                    <a class="h2 pink clickable-pink text-decoration-none" target="_blank" href="${item.link}">${item.title}</a>
                </p>
                <div class="row">
                    <div class="col-12 col-lg-6">
                        <img class="img-fluid m-3 border border-light rounded-5 border-2 mx-auto" src="images/${item.image}.png" alt="screenshot of ${item.title} site">
                    </div>
                    <div class="col-12 col-lg-6">
                        <p class="h5 m-3">
                            ${item.description}
                        </p>
                        <p class="h6 m-3 pink">
                            Tags: ${item.tags}
                        </p>
                    </div>
                </div>
            </div>
        `;

        cardContainer.appendChild(card);
    });
}


$(document).ready(function () {
    $('#filter-toggle').click(function () {
        $('#filters').slideToggle('slow');
    });

    $('#filter-button').click(function () {

        let selectedTags = [];
        
        $('#tags input:checked').each(function () {
            selectedTags.push($(this).val());
        })

        let cards = document.getElementsByClassName("my-card");

        for (let i=0; i<cards.length; i++) {
            let hasTags = false;

            let itemTags = cards[i].dataset.tags.split(" ");

            for (let j=0; j<itemTags.length; j++) {

                if (selectedTags.includes(itemTags[j])) {
                    hasTags = true;
                    break;
                }
            }

            if (hasTags || selectedTags.length === 0) {
                $(cards[i]).show();
            }
            else {
                $(cards[i]).hide();
            }
        }
    });
});