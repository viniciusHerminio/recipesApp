import PropTypes from 'prop-types';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

function Recipes({ type }) {
  return (
    <div>
      Recipes
      {type === 'meals' ? <Meals /> : <Drinks /> }
    </div>
  );
}

Recipes.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Recipes;
