import dotenv from "dotenv";

import { initDatabase } from "./db/init.js";
import { Recipe } from "./db/models/recipe.js";

dotenv.config();

await initDatabase();

const recipe = new Recipe({
    title: "Hello second recipe!",
    author: "John Doe",
    ingredients: "This is my new exciting content.",
    image: "cool food image",
});
await recipe.save();

const recipes = await Recipe.find();
console.log(recipes);
