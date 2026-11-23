import { getUserInfoById } from "../services/users.js";

export const recipeSchema = `#graphql
  type Recipe {
    id: ID!
    title: String!
    author: User
    ingredients: String
    image: String
    likes: String
    createdAt: Float
    updatedAt: Float
  }
`; // Required Backtick

export const recipeResolver = {
    Recipe: {
        author: async (recipe) => {
            return await getUserInfoById(recipe.author);
        },
    },
};
