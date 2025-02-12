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

const instructorColors = {};

function getInstructorColor(instructor) {
  if (!instructorColors[instructor]) {
    instructorColors[instructor] = pastelColors[Object.keys(instructorColors).length % pastelColors.length];
  }
  return instructorColors[instructor];
}

const testData = {
  data: [
    { id: 5, text: "Advanced JavaScript", start_date: "2025-02-24", duration: 5, owner: "Alice Smith", color: getInstructorColor("Alice Smith") },
    { id: 6, text: "Introduction to Machine Learning", start_date: "2025-02-26", duration: 10, owner: "Bob Johnson", color: getInstructorColor("Bob Johnson") },
    { id: 7, text: "Data Science with Python", start_date: "2025-02-07", duration: 8, owner: "Carol Williams", color: getInstructorColor("Carol Williams") },
    { id: 8, text: "Full Stack Web Development", start_date: "2025-02-15", duration: 12, owner: "Alice Smith", color: getInstructorColor("Alice Smith") },
    { id: 9, text: "Cloud Computing Essentials", start_date: "2025-03-01", duration: 20, owner: "Alice Smith", color: getInstructorColor("Alice Smith") },
    { id: 10, text: "Cybersecurity Fundamentals", start_date: "2025-02-10", duration: 7, owner: "Frank Miller", color: getInstructorColor("Frank Miller") },
    { id: 11, text: "Mobile App Development", start_date: "2025-02-20", duration: 15, owner: "Grace Wilson", color: getInstructorColor("Grace Wilson") },
    { id: 12, text: "Artificial Intelligence Basics", start_date: "2025-02-07", duration: 10, owner: "Hank Moore", color: getInstructorColor("Hank Moore") },
    { id: 13, text: "Blockchain Technology", start_date: "2025-02-19", duration: 12, owner: "Ivy Taylor", color: getInstructorColor("Ivy Taylor") },
    { id: 14, text: "DevOps Practices", start_date: "2025-03-20", duration: 22, owner: "Jack Anderson", color: getInstructorColor("Jack Anderson") },
    { id: 15, text: "Game Development with Unity", start_date: "2025-02-06", duration: 14, owner: "Karen Thomas", color: getInstructorColor("Karen Thomas") },
    { id: 16, text: "Big Data Analytics", start_date: "2025-01-10", duration: 14, owner: "Leo Jackson", color: getInstructorColor("Leo Jackson") },
    { id: 17, text: "Internet of Things (IoT)", start_date: "2025-01-20", duration: 16, owner: "Mia White", color: getInstructorColor("Mia White") },
    { id: 18, text: "Software Testing and QA", start_date: "2025-01-01", duration: 10, owner: "Nina Harris", color: getInstructorColor("Nina Harris") },
    { id: 19, text: "Digital Marketing Strategies", start_date: "2025-01-10", duration: 20, owner: "Oscar Martin", color: getInstructorColor("Oscar Martin") },
    { id: 20, text: "UX/UI Design Principles", start_date: "2025-01-20", duration: 15, owner: "Paula Thompson", color: getInstructorColor("Paula Thompson") },
    { id: 21, text: "Agile Project Management", start_date: "2025-02-01", duration: 12, owner: "Quinn Garcia", color: getInstructorColor("Quinn Garcia") },
    { id: 22, text: "Deep Learning with TensorFlow", start_date: "2025-02-10", duration: 18, owner: "Rita Martinez", color: getInstructorColor("Rita Martinez") },
    { id: 23, text: "Network Security", start_date: "2025-02-20", duration: 22, owner: "Sam Robinson", color: getInstructorColor("Sam Robinson") },
    { id: 24, text: "Database Management Systems", start_date: "2025-03-01", duration: 25, owner: "Tina Clark", color: getInstructorColor("Tina Clark") },
    { id: 25, text: "Ethical Hacking", start_date: "2025-03-10", duration: 20, owner: "Uma Lewis", color: getInstructorColor("Uma Lewis") },
    { id: 26, text: "React Native Development", start_date: "2025-03-20", duration: 15, owner: "Victor Lee", color: getInstructorColor("Victor Lee") },
    { id: 27, text: "Virtual Reality Development", start_date: "2025-01-01", duration: 30, owner: "Wendy Walker", color: getInstructorColor("Wendy Walker") },
    { id: 28, text: "Robotics Programming", start_date: "2025-01-10", duration: 18, owner: "Xander Hall", color: getInstructorColor("Xander Hall") },
    { id: 29, text: "Natural Language Processing", start_date: "2025-01-20", duration: 22, owner: "Yara Young", color: getInstructorColor("Yara Young") },
    { id: 30, text: "Quantum Computing Fundamentals", start_date: "2025-02-01", duration: 7, owner: "Hank Moore", color: getInstructorColor("Hank Moore") },
  ],
};

export default testData;
