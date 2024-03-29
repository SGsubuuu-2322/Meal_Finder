const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random_Btn = document.getElementById("random"),
  result_heading = document.getElementById("result-heading"),
  mealsEl = document.getElementById("meals"),
  single_mealEl = document.getElementById("single-meal");

function searchMeal(e) {
  e.preventDefault();

  single_mealEl.innerHTML = "";

  const term = search.value;
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        result_heading.innerHTML = `<h2>Search results for '${term}': </h2>`;
        if (data.meals === null) {
          mealsEl.innerHTML = `<p>There no search results. Try again! </p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) =>
                `
            <div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                <div class="meal-info" data-mealId = "${meal.idMeal}">
                 <h3>${meal.strMeal}</h3>
                </div>

            </div>
            
            `
            )
            .join("");
        }
      });
    search.value = "";
  } else {
    alert("Please enter something to seach for you meal....");
  }
}

function getMealById(mealId) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDom(meal);
    });
}

function getRandomMeal() {
  mealsEl.innerHTML = "";
  result_heading.innerHTML = "";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDom(meal);
    });
}

function addMealToDom(meal) {
  const ingredients = [];

  for (let i = 1; i < 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
      <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
        </div>
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients: </h2>
            <ul>
              ${ingredients.map((ing) => `<li> ${ing} </li>`).join("")}
            </ul>
        </div>
      </div>
  `;
}

submit.addEventListener("submit", searchMeal);
random_Btn.addEventListener("click", getRandomMeal);

mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.composedPath().find((item) => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  const mealId = mealInfo.getAttribute("data-mealid");
  getMealById(mealId);
});
