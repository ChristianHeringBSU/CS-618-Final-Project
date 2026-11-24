import PropTypes from "prop-types";
export function RecipeSorting({
    orderValue,
    onOrderChange,
}) {
    return (
        <div>
            <label htmlFor='sortBy'>Sort By Like Count: </label>

            <select
                name='ordering'
                id='ordering'
                value={orderValue}
                onChange={(e) => onOrderChange(e.target.value)}
            >
                <option value="ascending">ascending</option>
                <option value="descending">descending</option>
            </select>
        </div>
    );
}
RecipeSorting.propTypes = {
    orderValue: PropTypes.string.isRequired,
    onOrderChange: PropTypes.func.isRequired,
};
