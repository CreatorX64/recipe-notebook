# Recipe App

This is an app that I built in response to a final project prompt that was given by a JavaScript course called [The Modern JavaScript Bootcamp](https://www.udemy.com/course/modern-javascript/).

In addition to the project requirements (see below), I added a feature to filter recipes that have missing ingredients.

The app can be accessed via this link: [Recipe App Netlify link](https://relaxed-boyd-fa3545.netlify.app/).

![Recipe app homepage](./assets/screen.gif)

## Stack

The tech stack of the app includes following technologies:

- HTML
- CSS
- TypeScript
- Browser APIs (Local Storage)
- Vite (for TS compilation & bundling)

Initially, I implemented this project using JavaScript as the programming language, and Webpack & Babel for bundling & transpilation. After I discovered the build tool Vite and learned TypeScript, I ported this project to use those technologies instead.

## Requirements

The project prompt included the following requirements:

- There should be a home page where users can see all recipes.
- In the home page:
  - Users should be able to filter recipes by text.
  - Users should be able to add a new recipe.
  - Users should be able to navigate to a recipe's details by clicking on it.
- There should be a recipe details page where users can see & edit details of a recipe.
  - Changes should be saved to Local Storage instantly, without requiring a save button.
  - Users should be able to add/remove ingredients to/from a recipe.
  - Users should be able to delete a recipe.
