import { gql } from "@apollo/client/core/index.js";

export const RECIPE_FIELDS = gql`
    fragment RecipeFields on Recipe {
        id
        title
        ingredients
        image
        likes
        updatedAt
        createdAt
        author {
            username
        }
    }
`; // Required Backtick

export const GET_RECIPES = gql`
    ${RECIPE_FIELDS}
    query getRecipes($options: RecipesOptions) {
        recipes(options: $options) {
            ...RecipeFields
        }
    }
`; // Required Backtick

export const GET_RECIPES_BY_LIKE_COUNT = gql`
    ${RECIPE_FIELDS}
    query getRecipesByLikeCount($ordering: String) {
        recipesByLikeCount(ordering: $ordering) {
            ...RecipeFields
        }
    }
`; // Required Backtick

export const CREATE_RECIPE = gql`
    mutation createRecipe(
        $title: String!
        $ingredients: String
        $image: String
    ) {
        createRecipe(title: $title, ingredients: $ingredients, image: $image) {
            id
            title
        }
    }
`; // Required Backtick

export const DELETE_RECIPE = gql`
    mutation deleteRecipe($id: String) {
        deleteRecipe(id: $id) {
            id
            title
        }
    }
`; // Required Backtick

export const LIKE_RECIPE = gql`
    mutation likeRecipe($id: String) {
        likeRecipe(id: $id) {
            id
            title
        }
    }
`; // Required Backtick
