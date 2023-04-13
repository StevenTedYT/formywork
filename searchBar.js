// Cette fonction récupère la liste des fruits et légumes depuis un fichier JSON
function fetchFruitsLegumes() {
    return fetch('assets/js/data.json')
        .then(response => response.json())
        .then(data => data.fruitsLegumes);
}

// Cette fonction affiche ou masque les éléments HTML en fonction de la valeur du paramètre "show"
function toggleAllFruitsLegumesDisplay(show) {
    const allFruitsLegumesElement = document.getElementById('allfruitslegumes');
    if (allFruitsLegumesElement) {
        allFruitsLegumesElement.style.display = show ? '' : 'none';
    }
    const searchIconElement = document.getElementById('searchIcon')
    if (searchIconElement) {
        searchIconElement.style.display = show ? '' : 'none';
    }
}

// Cette fonction ajoute un événement "input" à l'élément de la barre de recherche
document.getElementById('searchBarFruitsLegumes').addEventListener('input', event => {
    const query = event.target.value;
    
    if (query === '') {
        displayFruitsLegumesResults([]);
        toggleAllFruitsLegumesDisplay(true);
        return;
    }

    toggleAllFruitsLegumesDisplay(false);

    fetchFruitsLegumes()
        .then(fruitsLegumes => searchFruitsLegumes(query, fruitsLegumes))
        .then(results => displayFruitsLegumesResults(results));
});

// Cette fonction supprime les accents d'une chaîne de caractères
function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Cette fonction effectue la recherche de fruits et légumes en fonction de la requête et attribue un score à chaque résultat
function searchFruitsLegumes(query, fruitsLegumes) {
    const words = query.trim().toLowerCase().split(/\s+/).map(removeAccents);

    const scoredResults = fruitsLegumes.map(fruitLegume => {
        const nomWords = fruitLegume.nom.toLowerCase().split(/\s+/).map(removeAccents);
        const categorieWords = fruitLegume.categorie.toLowerCase().split(/\s+/).map(removeAccents);
        const allWords = nomWords.concat(categorieWords);
        let score = 0;

        words.forEach(word => {
            allWords.forEach(fruitLegumeWord => {
                if (fruitLegumeWord.includes(word)) {
                    score++;
                }
            });
        });

        return { fruitLegume, score };
    });

    return scoredResults
        .filter(result => result.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(result => result.fruitLegume);
}

// Cette fonction affiche les résultats de la recherche des fruits et légumes
const displayFruitsLegumesResults = (results, append = false) => {
    const resultDiv = document.getElementById('result');

    if (results.length === 0 && resultDiv.innerHTML === '') {
        resultDiv.innerHTML = "<p>Aucun résultat trouvé</p>";
    } else {
        if(!append) {
            resultDiv.innerHTML = '';
        }
        results.forEach(item => {
            // Vérifie si l'élément n'est pas déjà affiché pour éviter les doublons
            const cardDiv = document.createElement('div');
            // Ici, vous pouvez personnaliser l'affichage de chaque élément de résultat en créant et en modifiant les éléments HTML appropriés
        cardDiv.className = 'col-sm-6 col-lg-5 col-xl-3 card-div';
        cardDiv.style.marginTop = '10px';
        cardDiv.style.marginBottom = '18px';
        const itemLink = document.createElement('a');
        itemLink.href = item.target_link;
        itemLink.style.color = 'rgb(33,37,41)';

        const card = document.createElement('div');
        card.className = 'card new-card text-center clean-card card-shadow';
        card.style.borderRadius = '25px';
        card.style.borderWidth = '3px';
        card.style.borderColor = 'rgb(241,243,245)';

        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'img-wrapper';

        const img = document.createElement('img');
        img.className = 'img-fluid card-img-top w-100 d-block';
        img.src = item.image;
        img.style.minWidth = 'auto';
        img.style.maxWidth = 'none';
        img.style.paddingTop = '3px';
        img.style.borderRadius = '25px';

        imgWrapper.appendChild(img);

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body info';

        const cardTitle = document.createElement('a');
        cardTitle.className = 'fs-5 cta-btn';
        cardTitle.href = item.target_link;
        cardTitle.style.marginTop = '20px';
        cardTitle.style.color = '#2b2b2b';
        cardTitle.innerHTML = `${item.nom} - ${item.categorie}<br />`;

        cardBody.appendChild(cardTitle);
        card.appendChild(imgWrapper);
        card.appendChild(cardBody);
        itemLink.appendChild(card);
        cardDiv.appendChild(itemLink);
        resultDiv.appendChild(cardDiv);
    });
}};

document.getElementById('searchBarFruitsLegumes').addEventListener('input', event => {
    const query = event.target.value;
    if (query === '') {
        displayFruitsLegumesResults([]);
        return;
        }
    fetchFruitsLegumes()
        .then(fruitsLegumes => searchFruitsLegumes(query, fruitsLegumes))
        .then(results => displayFruitsLegumesResults(results));
        });