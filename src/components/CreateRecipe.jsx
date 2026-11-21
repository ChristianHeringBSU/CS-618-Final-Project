import { useState } from "react";
import { useMutation as useGraphQLMutation } from "@apollo/client/react/index.js";
import { Link } from "react-router-dom";
import slug from "slug";

import { useAuth } from "../contexts/AuthContext.jsx";
import {
    CREATE_RECIPE,
    GET_RECIPES,
    GET_RECIPES_BY_AUTHOR,
} from "../api/graphql/recipes.js";

export function CreateRecipe() {
    const [token] = useAuth();
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [image, setImage] = useState("");

    const [createRecipe, { loading, data }] = useGraphQLMutation(
        CREATE_RECIPE,
        {
            variables: { title, ingredients, image },
            context: { headers: { Authorization: `Bearer ${token}` } },
            refetchQueries: [GET_RECIPES, GET_RECIPES_BY_AUTHOR],
        },
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        createRecipe();
    };

    if (!token) return <div>Please log in to create new recipes.</div>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='create-title'>Title: </label>
                <input
                    type='text'
                    name='create-title'
                    id='create-title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <br />
            {/* TODO: Add CreateIngredient Component Here */}
            <br />
            <div>
                <label htmlFor='create-title'>Image URL: </label>
                <input
                    type='text'
                    name='create-image'
                    id='create-image'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
            </div>
            <br />
            <br />
            <input
                type='submit'
                value={loading ? "Creating..." : "Create"}
                disabled={!title || loading}
            />
            {data?.createRecipe ? (
                <>
                    <br />
                    Recipe{" "}
                    <Link
                        to={`/recipes/${data.createRecipe.id}/${slug(
                            data.createRecipe.title,
                        )}`}
                    >
                        {data.createRecipe.title}
                    </Link>{" "}
                    created successfully!
                </>
            ) : null}
        </form>
    );
}
