import { v4 as uuidv4 } from "uuid";

interface Ingredient {
  id: string;
  title: string;
  isOwned: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  instructions: string;
  ingredients: Ingredient[];
}

interface RecipeUpdates {
  title?: string;
  instructions?: string;
  isOwned?: [string, boolean];
}

let recipes: Recipe[] = [
  {
    id: uuidv4(),
    title: "Roast Beef",
    instructions:
      "Bacon ipsum dolor amet short ribs pork chop chislic strip steak short loin porchetta bresaola biltong tail sausage ribeye. Pastrami salami doner rump pig corned beef strip steak. Leberkas tri-tip burgdoggen, bacon biltong frankfurter rump hamburger. Bacon corned beef jowl ground round cupim pig pork chop pastrami pork loin.",
    ingredients: [
      { id: uuidv4(), title: "Beef", isOwned: false },
      { id: uuidv4(), title: "Rice", isOwned: false },
      { id: uuidv4(), title: "Olive oil", isOwned: false },
      { id: uuidv4(), title: "Parsley", isOwned: true }
    ]
  },
  {
    id: uuidv4(),
    title: "Scrambled Eggs",
    instructions:
      "Alcatra ground round chislic ball tip, shankle beef meatloaf cow bacon. Prosciutto bresaola tongue, swine porchetta salami landjaeger tri-tip pig cow. Jowl alcatra spare ribs chislic shoulder boudin sausage chuck.",
    ingredients: [
      { id: uuidv4(), title: "Eggs", isOwned: true },
      { id: uuidv4(), title: "Cream fresh", isOwned: true },
      { id: uuidv4(), title: "Butter", isOwned: true }
    ]
  }
];

// Save recipes to storage from app state.
const saveRecipes = (): void => {
  localStorage.setItem("recipes", JSON.stringify(recipes));
};

// Load recipes from storage to app state.
export const loadRecipes = (): void => {
  const recipesJSON = localStorage.getItem("recipes");

  if (recipesJSON !== null) {
    try {
      recipes = JSON.parse(recipesJSON);
    } catch {
      recipes = [];
    }
  } else {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }
};

// Expose recipes to outside modules.
export const getRecipes = (): Recipe[] => recipes;

// Create a new empty recipe, update state & storage.
export const createRecipe = (): string => {
  const id = uuidv4();

  recipes.push({
    id,
    title: "",
    instructions: "",
    ingredients: []
  });

  saveRecipes();

  return id;
};

// Create new ingredient for a recipe, update state & storage.
export const createIngredient = (
  recipeId: string,
  ingredientTitle: string
): void => {
  const recipe = recipes.find((recipe) => recipe.id === recipeId);

  if (recipe === undefined) {
    return;
  }

  recipe.ingredients.push({
    id: uuidv4(),
    title: ingredientTitle,
    isOwned: false
  });

  saveRecipes();
};

// Remove a recipe, update state & storage.
export const removeRecipe = (id: string): void => {
  const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);

  if (recipeIndex > -1) {
    recipes.splice(recipeIndex, 1);
    saveRecipes();
  }
};

// Remove an ingredient from a recipe, update state & storage.
export const removeIngredient = (
  recipeId: string,
  ingredientId: string
): void => {
  const recipe = recipes.find((recipe) => recipe.id === recipeId);

  if (recipe === undefined) {
    return;
  }

  const ingredientIndex = recipe.ingredients.findIndex((ingredient) => {
    return ingredient.id === ingredientId;
  });

  if (ingredientIndex !== -1) {
    recipe.ingredients.splice(ingredientIndex, 1);
  }

  saveRecipes();
};

// Update a recipe in state & storage.
export const updateRecipe = (id: string, updates: RecipeUpdates) => {
  const recipe = recipes.find((recipe) => recipe.id === id);

  if (recipe === undefined) {
    return;
  }

  // if (typeof updates.title === "string") {
  if (updates.title) {
    recipe.title = updates.title;
  }

  // if (typeof updates.instructions === "string") {
  if (updates.instructions) {
    recipe.instructions = updates.instructions;
  }

  // if (typeof updates.isOwned === "object") {
  if (updates.isOwned) {
    const [ingredientId, isOwned] = updates.isOwned;
    const ingredient = recipe.ingredients.find((ingredient) => {
      return ingredient.id === ingredientId;
    });

    if (ingredient !== undefined) {
      ingredient.isOwned = isOwned;
    }
  }

  saveRecipes();

  return recipe;
};

loadRecipes();
