import "./styles/main.css";
import { setFilters } from "./filters";
import { createRecipe, loadRecipes } from "./recipes";
import { renderRecipes } from "./views";

renderRecipes();

document.querySelector("#create-recipe")!.addEventListener("click", () => {
  const id = createRecipe();
  location.assign(`/edit.html#${id}`);
});

document.querySelector("#filter-title")!.addEventListener("input", (event) => {
  const target = event.target as HTMLInputElement;
  setFilters({ searchText: target.value });
  renderRecipes();
});

document.querySelector("#hide-recipes")!.addEventListener("change", (event) => {
  const target = event.target as HTMLInputElement;
  setFilters({ hideMissing: target.checked });
  renderRecipes();
});

window.addEventListener("storage", (event) => {
  if (event.key === "recipes") {
    loadRecipes();
    renderRecipes();
  }
});
