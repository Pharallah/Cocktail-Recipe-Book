document.addEventListener('DOMContentLoaded', fetchDrinks);

// Initiates GET Request
function fetchDrinks() {
    const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=cocktail';
    fetch(drinkUrl)
    .then(res => res.json())
    .then(drinks => {
        drinks.drinks.forEach(drink => renderDrinks(drink))
    });
}

// Renders drinks to DOM
function renderDrinks(drink) {
    const drinkContainer = document.querySelector('#drink_container');
    const span = document.createElement('span');
    span.innerText = drink.strDrink;
    drinkContainer.appendChild(span);

    // Adds Mouseover/Mouseout highlighting drink selection
    span.addEventListener('mouseover', e => {
        e.target.style.backgroundColor = 'pink';
    });

    span.addEventListener('mouseout', e => {
        e.target.style.backgroundColor = '';
    });

    // Renders chosen drink's recipe
    span.addEventListener('click', () => {
        const drinkInfo = document.querySelector('#drink_info');
        const ingredients = document.querySelector('#ingredients');
        const instructions = document.querySelector('#instructions');
        drinkInfo.innerHTML = '';
        const img = document.createElement('img');
        const h2 = document.createElement('h2');
        const h4 = document.createElement('h4');
        const ul = document.createElement('ul');
        const instruct = document.createElement('h4');
        const p = document.createElement('p');
        const button = document.createElement('button');

        ul.className = 'ingList';
        img.src = drink.strDrinkThumb;
        h2.innerText = drink.strDrink;
        h4.innerText = 'Ingredients:';
        instruct.innerText = 'Instructions:';
        p.innerText = drink.strInstructions;
        button.innerText = 'Change Language to German 🇩🇪'; 

        // Creates the <li> for Ingredients
        for (let i = 1; i <= 15; i++) {
            const ingredientkey = `strIngredient${i}`;
            const ingredientValue = drink[ingredientkey];
            const measureKey = `strMeasure${i}`;
            const measureValue = drink[measureKey];

            if (ingredientValue !== null) {
                const li = document.createElement('li');
                li.innerText = `${measureValue} ${ingredientValue}`;
                ul.appendChild(li);
            };
        };

        drinkInfo.append(h2, img, h4);
        ingredients.innerHTML = '';
        ingredients.append(ul);
        instructions.innerHTML = '';
        instructions.append(instruct, p, button);

        // Change Language Feature
        button.addEventListener('click', () => {
            if (p.innerText === drink.strInstructions) {
                p.innerText = drink.strInstructionsDE;
                button.innerText = 'Change Language to Italian 🇮🇹';  
              } else if (p.innerText === drink.strInstructionsDE) {
                p.innerText = drink.strInstructionsIT;
                button.innerText = 'Change Language to English 🇬🇧';
              } else if (p.innerText === drink.strInstructionsIT) {
                p.innerText = drink.strInstructions;
                button.innerText = 'Change Language to German 🇩🇪';
              };
        });
    });
}