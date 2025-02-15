import React from "react";
import PropTypes from "prop-types";
import "./Instructor.css";

const pastelColors = [
  'pastel-color-1', 'pastel-color-2', 'pastel-color-3', 'pastel-color-4', 'pastel-color-5',
  'pastel-color-6', 'pastel-color-7', 'pastel-color-8', 'pastel-color-9', 'pastel-color-10'
];

const instructorColors = {};

function getInstructorColor(instructor) {
  if (!instructorColors[instructor]) {
    instructorColors[instructor] = pastelColors[Object.keys(instructorColors).length % pastelColors.length];
  }
  return instructorColors[instructor];
}

const Instructor = ({ name }) => {
  const color = getInstructorColor(name) || 'default-color';
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
