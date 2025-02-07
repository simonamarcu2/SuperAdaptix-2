import PropTypes from 'prop-types';
import "./Instructor.css";
import testData from '../../data/testData';


// Predefined pastel colors
const pastelColors = [
  'pastel-color-1', 'pastel-color-2', 'pastel-color-3', 'pastel-color-4', 'pastel-color-5',
  'pastel-color-6', 'pastel-color-7', 'pastel-color-8', 'pastel-color-9', 'pastel-color-10',
  'pastel-color-11', 'pastel-color-12', 'pastel-color-13', 'pastel-color-14', 'pastel-color-15',
  'pastel-color-16', 'pastel-color-17', 'pastel-color-18', 'pastel-color-19', 'pastel-color-20',
  'pastel-color-21', 'pastel-color-22', 'pastel-color-23', 'pastel-color-24', 'pastel-color-25',
  'pastel-color-26', 'pastel-color-27', 'pastel-color-28', 'pastel-color-29', 'pastel-color-30',
  'pastel-color-31', 'pastel-color-32', 'pastel-color-33', 'pastel-color-34', 'pastel-color-35',
  'pastel-color-36', 'pastel-color-37', 'pastel-color-38', 'pastel-color-39', 'pastel-color-40',
  'pastel-color-41', 'pastel-color-42', 'pastel-color-43', 'pastel-color-44', 'pastel-color-45',
  'pastel-color-46', 'pastel-color-47', 'pastel-color-48', 'pastel-color-49', 'pastel-color-50'
];

// Function to assign colors to instructors
function assignInstructorColors(data) {
  const instructorColors = {};
  let colorIndex = 0;
  data.forEach(item => {
    if (!instructorColors[item.instructor_name]) {
      instructorColors[item.instructor_name] = pastelColors[colorIndex % pastelColors.length];
      colorIndex++;
    }
  });

  return instructorColors;
}

// Assign colors to instructors
const instructorColors = assignInstructorColors(testData.data);

export default instructorColors ;
