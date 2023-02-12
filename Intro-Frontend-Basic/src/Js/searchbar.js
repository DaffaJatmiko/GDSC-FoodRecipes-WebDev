const searchbar = document.getElementById('searchbar');
const result = document.querySelector('.result');
const uri = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
searchbar.addEventListener('input', async (e) => {
  e.preventDefault();
  if (searchbar.value == '') return (result.innerHTML = '');
  await fetch(`${uri}${searchbar.value}`)
    .then((response) => response.json())
    .then((data) => {
      result.innerHTML = '';
      console.log(data.meals);
      data.meals.forEach((meal) => {
        const food_container = document.createElement('a');
        food_container.href =
          document.title == 'Homepage'
            ? `./detail_page/detailMenu.html?id=${meal.idMeal}`
            : `./detailMenu.html?id=${meal.idMeal}`;
        food_container.classList.add('food-container');
        food_container.innerHTML = `
        <div class="food-img">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="100px" height="100px">
        </div>
        <div class="food-info">
          <h3>${meal.strMeal}</h3>
          <p>${meal.strCategory}</p>
        </div>
      `;
        result.append(food_container);
      });
    })
    .catch((err) => console.log(err));
});
