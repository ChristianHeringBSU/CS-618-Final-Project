import dotenv from "dotenv";

import { initDatabase } from "./db/init.js";
import { Recipe } from "./db/models/recipe.js";

dotenv.config();

await initDatabase();

const recipe = new Recipe({
    title: "Hello second recipe!",
    author: "John Doe",
    contents: "This is my new exciting content.",
    tags: ["frontend"],
});
await recipe.save();

const recipes = await Recipe.find();
console.log(recipes);
