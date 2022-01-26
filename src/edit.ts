import "./styles/main.css";
import {
  loadRecipes,
  updateRecipe,
  removeRecipe,
  createIngredient
} from "./recipes";
import { initializeEditPage } from "./views";

const titleElem = document.querySelector("#recipe-title") as HTMLInputElement;
const instructionsElem = document.querySelector(
  "#recipe-instructions"
) as HTMLInputElement;
const ingredientInputElem = document.querySelector(
  "#ingredient-input"
) as HTMLInputElement;
const ingredientAddElem = document.querySelector(
  "#ingredient-add"
) as HTMLElement;
const removeElem = document.querySelector("#remove-recipe") as HTMLElement;

const recipeId = location.hash.substring(1);
initializeEditPage(recipeId);

titleElem.addEventListener("input", (event) => {
  const target = event.target as HTMLInputElement;
  updateRecipe(recipeId, { title: target.value });
});

instructionsElem.addEventListener("input", (event) => {
  const target = event.target as HTMLInputElement;
  updateRecipe(recipeId, { instructions: target.value });
});

ingredientAddElem.addEventListener("click", () => {
  const ingredientText = ingredientInputElem.value.trim();

  if (ingredientText.length > 0) {
    createIngredient(recipeId, ingredientText);
    ingredientInputElem.value = "";
    initializeEditPage(recipeId);
  }
});

ingredientInputElem.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const ingredientText = ingredientInputElem.value.trim();

    if (ingredientText.length > 0) {
      createIngredient(recipeId, ingredientText);
      ingredientInputElem.value = "";
      initializeEditPage(recipeId);
    }
  }
});

removeElem.addEventListener("click", () => {
  removeRecipe(recipeId);
  location.assign("/index.html");
});

window.addEventListener("storage", (event) => {
  if (event.key === "recipes") {
    loadRecipes();
    initializeEditPage(recipeId);
  }
});
