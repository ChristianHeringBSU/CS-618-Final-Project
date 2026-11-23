import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useMutation as useGraphQLMutation } from "@apollo/client/react/index.js";
import slug from "slug";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";

import { getUserInfo } from "../api/users.js";
import { useAuth } from "../contexts/AuthContext.jsx";
import { User } from "./User.jsx";
import {
    DELETE_RECIPE,
    GET_RECIPES,
    GET_RECIPES_BY_AUTHOR,
} from "../api/graphql/recipes.js";

export function Recipe({
    title,
    ingredients,
    author,
    image,
    id,
    fullRecipe = true,
}) {
    const [token] = useAuth();

    const { sub } = token ? jwtDecode(token) : {};

    const userInfoQuery = useQuery({
        queryKey: ["users", sub],
        queryFn: () => getUserInfo(sub),
        enabled: Boolean(sub),
    });

    const userInfo = userInfoQuery.data;
    if (userInfo.username == null) {
        userInfo.username = "unauthenticated!";
    }

    const [deleteRecipe, { loading, data }] = useGraphQLMutation(
        DELETE_RECIPE,
        {
            variables: { id },
            context: { headers: { Authorization: `Bearer ${token}` } },
            refetchQueries: [GET_RECIPES, GET_RECIPES_BY_AUTHOR],
        },
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        deleteRecipe();
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
                    <div style={{ whiteSpace: "pre-wrap" }}>{ingredients}</div>
                )}
                {/* https://stackoverflow.com/a/48577215 */}
                {fullRecipe && <img width='250px' src={image} />}
                {author && (
                    <em>
                        {fullRecipe && <br />}
                        Written by <User {...author} />
                    </em>
                )}

                <div>

                    <input type='submit'>Edit</input>

                    <input
                        value={loading ? "Deleting..." : "Delete"}
                        disabled={!title || loading}
                        type='submit'
                    />
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
    id: PropTypes.string.isRequired,
    fullRecipe: PropTypes.bool,
};
