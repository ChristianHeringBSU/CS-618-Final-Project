import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import slug from "slug";

import { User } from "./User.jsx";

export function Recipe({ title, contents, author, id, fullRecipe = false }) {
    return (
        <article>
            {fullRecipe ? (
                <h3>{title}</h3>
            ) : (
                <Link to={`/recipes/${id}/${slug(title)}`}>
                    <h3>{title}</h3>
                </Link>
            )}

            {fullRecipe && <div>{contents}</div>}
            {author && (
                <em>
                    {fullRecipe && <br />}
                    Written by <User {...author} />
                </em>
            )}
        </article>
    );
}
Recipe.propTypes = {
    title: PropTypes.string.isRequired,
    contents: PropTypes.string,
    author: PropTypes.shape(User.propTypes),
    id: PropTypes.string.isRequired,
    fullRecipe: PropTypes.bool,
};
