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
}

