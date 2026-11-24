import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useMutation as useGraphQLMutation } from "@apollo/client/react/index.js";
import slug from "slug";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";

import { useAuth } from "../contexts/AuthContext.jsx";
import { User } from "./User.jsx";
import {
    LIKE_RECIPE,
    GET_RECIPES,
    GET_RECIPES_BY_LIKE_COUNT,
} from "../api/graphql/recipes.js";

export function Recipe({
    title,
    ingredients,
    author,
    image,
    likes,
    id,
    fullRecipe = true,
}) {
    const [token] = useAuth();

    const { sub } = token ? jwtDecode(token) : {};

    const [likeRecipe, { loading, data }] = useGraphQLMutation(LIKE_RECIPE, {
        variables: { id },
        context: { headers: { Authorization: `Bearer ${token}` } },
        refetchQueries: [GET_RECIPES, GET_RECIPES_BY_LIKE_COUNT],
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        likeRecipe();
    };

    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(!liked);
    };

    return (
        <article>
            <form onSubmit={handleSubmit}>
                {fullRecipe ? (
                    <h3>{title}</h3>
                ) : (
                    <Link to={`/recipes/${id}/${slug(title)}`}>
                        <h3>{title}</h3>
                    </Link>
                )}
                {/* https://stackoverflow.com/a/55575600 */}
                {fullRecipe && (
                    <ul>
                        <div style={{ whiteSpace: "pre-wrap" }}>
                            {ingredients}
                        </div>
                    </ul>
                )}
                {/* https://stackoverflow.com/a/48577215 */}
                {fullRecipe && <img width='250px' src={image} />}

                <br />

                <div>Likes: {likes}</div>

                {author && (
                    <em>
                        {fullRecipe && <br />}
                        Written by <User {...author} />
                    </em>
                )}

                <br />

                <div>
                    {author.id != sub && (
                        <button disabled={loading} type='submit'>
                            {loading ? "Editing..." : "Edit"}
                        </button>
                    )}
                    {author.id != sub && (
                        <button disabled={loading} type='submit'>
                            {loading ? "Deleting..." : "Delete"}
                        </button>
                    )}
                    {/* https://stackoverflow.com/a/53685236 */}
                    {token && (
                        <button
                            onClick={handleLike}
                            disabled={loading}
                            type='submit'
                        >
                            {liked ? "Liked" : "Like"}
                        </button>
                    )}
                </div>

                {data?.deleteRecipe ? (
                    <>
                        <br />
                        Recipe {data.deleteRecipe.title} deleted successfully!
                    </>
                ) : null}
            </form>
        </article>
    );
}
Recipe.propTypes = {
    title: PropTypes.string.isRequired,
    ingredients: PropTypes.string.isRequired,
    author: PropTypes.shape(User.propTypes),
    image: PropTypes.string.isRequired,
    likes: PropTypes.string,
    id: PropTypes.string.isRequired,
    fullRecipe: PropTypes.bool,
};
