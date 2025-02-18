import "../components/Instructor/Instructor.css"

const pastelColors = [
  'pastel-color-1', 'pastel-color-2', 'pastel-color-3', 'pastel-color-4', 'pastel-color-5',
  'pastel-color-6', 'pastel-color-7', 'pastel-color-8', 'pastel-color-9', 'pastel-color-10'
];


export const instructor_names = [
  { id: 1, text: "Alice Smith", color: pastelColors[0] },
  { id: 2, text: "Bob Johnson", color: pastelColors[1] },
  { id: 3, text: "Carol Williams", color: pastelColors[2] },
  { id: 4, text: "Frank Miller", color: pastelColors[3] },
  { id: 5, text: "Grace Brown", color: pastelColors[4] },
  { id: 6, text: "Henry Davis", color: pastelColors[5] },
  { id: 7, text: "Ivy Wilson", color: pastelColors[6] },
  { id: 8, text: "Jack White", color: pastelColors[7] },
  { id: 9, text: "Kelly Harris", color: pastelColors[8] },
  { id: 10, text: "Larry Martin", color: pastelColors[9] },
];
const testData = {
  data: [
    { id: 11, open: true, text: "Data Science", type: "course" },
    { id: 12, open: true, text: "Web Development", type: "course" },
    { id: 13, open: true, text: "Cybersecurity", type: "course" },
    { id: 14, open: true, text: "Cloud Computing", type: "course" },
    { id: 15, open: true, text: "Machine Learning", type: "course" },
    { id: 16, open: true, text: "Programming", type: "course" },
    { id: 17, open: true, text: "JavaScript", type: "course" },
    { id: 18, open: true, text: "Python", type: "course" },
    { id: 19, open: true, text: "Java", type: "course" },
    { id: 20, open: true, text: "C#", type: "course" },
    { id: 21, text: instructor_names[0].text, start_date: "2025-02-20", duration: 5, parent: 11, type: "owner", owner:instructor_names[0].text },
    { id: 22, text: instructor_names[1].text, start_date: "2025-02-21", duration: 10, parent: 12, type: "owner" },
    { id: 23, text: instructor_names[2].text, start_date: "2025-02-22", duration: 5, parent: 13, type: "owner" },
    { id: 24, text: instructor_names[5].text, start_date: "2025-02-25", duration: 6, parent: 15, type: "owner" },
    { id: 25, text: instructor_names[6].text, start_date: "2025-02-26", duration: 9, parent: 16, type: "owner" },
    { id: 26, text: instructor_names[8].text, start_date: "2025-02-28", duration: 3, parent: 17, type: "owner" },
    { id: 27, text: instructor_names[3].text, start_date: "2025-02-23", duration: 10, parent: 14, type: "owner" },
    { id: 28, text: instructor_names[4].text, start_date: "2025-02-24", duration: 8, parent: 14, type: "owner" },
    { id: 29, text: instructor_names[7].text, start_date: "2025-02-27", duration: 4, parent: 18, type: "owner" },
  ],
};

export default testData;
