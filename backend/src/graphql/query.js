import {
    getRecipeById,
    listAllRecipes,
    listRecipesByLikeCount,
    listRecipesByTag,
} from "../services/recipes.js";

export const querySchema = `#graphql
    input RecipesOptions {
        sortBy: String
        sortOrder: String
    }

  type Query {
    test: String
    recipes(options: RecipesOptions): [Recipe!]!
    recipesByLikeCount(ordering: String): [Recipe!]!
    recipesByTag(tag: String!, options: RecipesOptions): [Recipe!]!
    recipeById(id: ID!, options: RecipesOptions): Recipe
  }
`; // Closing Backtick

export const queryResolver = {
    Query: {
        test: () => {
            return "Hello World from GraphQL!";
        },
        recipes: async (parent, { options }) => {
            return await listAllRecipes(options);
        },
        recipesByLikeCount: async (ordering) => {
            return await listRecipesByLikeCount(ordering);
        },
        recipesByTag: async (parent, { tag, options }) => {
            return await listRecipesByTag(tag, options);
        },
        recipeById: async (parent, { id }) => {
            return await getRecipeById(id);
        },
    },
};
