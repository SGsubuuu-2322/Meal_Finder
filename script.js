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

submit.addEventListener("submit", searchMeal);
