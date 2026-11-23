import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery as useGraphQLQuery } from "@apollo/client/react/index.js";

import { RecipeList } from "../components/RecipeList.jsx";
import { CreateRecipe } from "../components/CreateRecipe.jsx";
import { RecipeFilter } from "../components/RecipeFilter.jsx";
import { RecipeSorting } from "../components/RecipeSorting.jsx";
import { GET_RECIPES, GET_RECIPES_BY_AUTHOR } from "../api/graphql/recipes.js";
import { Header } from "../components/Header.jsx";

export function Blog() {
    const [author, setAuthor] = useState("");
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("descending");

    const recipesQuery = useGraphQLQuery(
        author ? GET_RECIPES_BY_AUTHOR : GET_RECIPES,
        {
            variables: { author, options: { sortBy, sortOrder } },
        },
    );
    const recipes =
        recipesQuery.data?.recipesByAuthor ?? recipesQuery.data?.recipes ?? [];

    return (
        <div style={{ padding: 8 }}>
            <Helmet>
                <title>Ball State Real-Time Recipe Blog</title>
                <meta
                    name='description'
                    content='A blog full of articles about full-stack React development.'
                />
            </Helmet>
            <Header />
            <br />
            <hr />
            <br />
            <CreateRecipe />
            <br />
            <hr />
            Filter by:
            <RecipeFilter
                field='author'
                value={author}
                onChange={(value) => setAuthor(value)}
            />
            <br />
            <RecipeSorting
                fields={["createdAt", "updatedAt"]}
                value={sortBy}
                onChange={(value) => setSortBy(value)}
                orderValue={sortOrder}
                onOrderChange={(orderValue) => setSortOrder(orderValue)}
            />
            <hr />
            <RecipeList recipes={recipes} />
        </div>
    );
}
