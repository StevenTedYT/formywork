# Système de recherche

Ce système de recherche permet de trouver des fruits et légumes en fonction d'une requête utilisateur. Il attribue un score de pertinence aux résultats en fonction de la correspondance entre les mots de la requête et les mots du nom et de la catégorie des fruits et légumes.

## Récupération des données

La fonction `fetchFruitsLegumes` récupère la liste des fruits et légumes depuis un fichier JSON :

```javascript
function fetchFruitsLegumes() {
    return fetch('assets/js/data.json')
        .then(response => response.json())
        .then(data => data.fruitsLegumes);
}
```

## Gestion de l'affichage

La fonction `toggleAllFruitsLegumesDisplay` affiche ou masque les éléments HTML en fonction de la valeur du paramètre "show" :

```javascript
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
```

## Événement de recherche

La barre de recherche écoute l'événement "input" et déclenche la recherche lorsqu'une requête est entrée par l'utilisateur :

```javascript
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
```

## Suppression des accents

La fonction `removeAccents` supprime les accents d'une chaîne de caractères :

```javascript 
function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
```
## Recherche et système de points

La fonction `searchFruitsLegumes` effectue la recherche en fonction de la requête et attribue un score à chaque résultat :

```javascript
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
```

## Affichage des résultats

La fonction `displayFruitsLegumesResults` crée et modifie les éléments HTML pour afficher chaque résultat :

```javascript
const displayFruitsLegumesResults = (results, append = false) => {
    const resultDiv = document.getElementById('result');

    if (results.length === 0 && resultDiv.innerHTML === '') {
        resultDiv.innerHTML = "<p>Aucun résultat trouvé</p>";
    } else {
        if(!append) {
            resultDiv.innerHTML = '';
        }
        results.forEach(item => {
            if (!isElementAlreadyDisplayed(item)) {
                const cardDiv = document.createElement('div');
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
            }
        });
    }
};
```

Ces différents éléments sont combinés pour former un système de recherche efficace et facile à utiliser pour trouver des fruits et légumes en fonction de la requête de l'utilisateur.
Le système de recherche de fruits et légumes utilise une combinaison de techniques pour fournir des résultats pertinents à l'utilisateur. Il utilise la récupération de données à partir d'un fichier JSON, la suppression des accents, la recherche de correspondances de mots et un système de points pour attribuer un score de pertinence à chaque résultat. La fonction d'affichage des résultats crée et modifie les éléments HTML pour afficher les résultats de manière claire et concise. Dans l'ensemble, ce système de recherche offre une solution simple mais efficace pour trouver des fruits et légumes en fonction des besoins de l'utilisateur.