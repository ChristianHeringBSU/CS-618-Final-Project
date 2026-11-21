import { gql } from "@apollo/client/core/index.js";

export const RECIPE_FIELDS = gql`
    fragment RecipeFields on Recipe {
        id
        title
        contents
        tags
        updatedAt
        createdAt
        author {
            username
        }
    }
`; // Required Backtick

export const GET_RECIPES = gql`
    ${RECIPE_FIELDS}
    query getRecipes($options: RECIPEsOptions) {
        recipes(options: $options) {
            ...RecipeFields
        }
    }
`; // Required Backtick

export const GET_RECIPES_BY_AUTHOR = gql`
    ${RECIPE_FIELDS}
    query getRecipesByAuthor($author: String!, $options: RecipesOptions) {
        recipesByAuthor(username: $author, options: $options) {
            ...RecipeFields
        }
    }
`; // Required Backtick

export const CREATE_RECIPE = gql`
    mutation createRecipe(
        $title: String!
        $contents: String
        $tags: [String!]
    ) {
        createRecipe(title: $title, contents: $contents, tags: $tags) {
            id
            title
        }
    }
`; // Required Backtick
