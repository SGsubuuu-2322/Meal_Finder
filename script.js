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
        console.log(data);
      });
  } else {
    alert("Please enter something to seach for you meal....");
  }
}

submit.addEventListener("submit", searchMeal);
