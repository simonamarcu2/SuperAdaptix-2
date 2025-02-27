import "./Header.css";
import PropTypes from 'prop-types';

const Header = ({ instructors }) => {
  return (
    <header className="header">
      <div className="header-title">
        <h1>SuperAdaptix</h1>
      </div>

      <div className="instructor-legend">
        {instructors.map((instructor) => (
          <div key={instructor.id} className="legend-item">
            <span
              className="color-box"
              style={{ backgroundColor: instructor.color }}
            ></span>
            {instructor.name}
          </div>
        ))}
      </div>
    </header>
  );
};
Header.propTypes = {
  instructors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Header;
