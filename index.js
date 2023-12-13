document.addEventListener('DOMContentLoaded', fetchDrinks);

function fetchDrinks() {
    const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=cocktail';
    fetch(drinkUrl)
    .then(res => res.json())
    .then(drinks => {
        drinks.drinks.forEach(drink => renderDrinks(drink))
    })
}

function renderDrinks(drink) {
    const drinkContainer = document.querySelector('#drink_container');
    const span = document.createElement('span');
    span.className = 'drink_selection'
    span.innerText = drink.strDrink;
    drinkContainer.appendChild(span);

    span.addEventListener('mouseover', (e) => {
        e.target.style.backgroundColor = 'red';
    });

    span.addEventListener('mouseout', e => {
        e.target.style.backgroundColor = '';
    });

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

        ul.className = 'ingList'
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
            }
        }

        drinkInfo.append(h2, img, h4);
        ingredients.innerHTML = '';
        ingredients.append(ul);
        instructions.innerHTML = '';
        instructions.append(instruct, p, button);

        
    });
}