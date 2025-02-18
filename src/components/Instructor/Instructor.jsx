import PropTypes from "prop-types";
import { useMemo } from "react";
import "./Instructor.css";
import testData from "../../data/testData.jsx";

const pastelColors = [
  'pastel-color-1', 'pastel-color-2', 'pastel-color-3', 'pastel-color-4', 'pastel-color-5',
  'pastel-color-6', 'pastel-color-7', 'pastel-color-8', 'pastel-color-9', 'pastel-color-10'
];

const Instructor = ({ name }) => {
  const instructorColors = useMemo(() => {
    const colors = {};
    testData.instructors.forEach((instructor, index) => {
      colors[instructor.name] = pastelColors[index % pastelColors.length];
    });
    return colors;
  }, []);

  const color = instructorColors[name] || 'default-color';

  return (
    <div className={`instructor ${color}`}>
      <span>{name}</span>
    </div>
  );
};

Instructor.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Instructor;
