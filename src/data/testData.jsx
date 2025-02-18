export const instructor_names = [
  { id: 1, text: "Alice Smith" },
  { id: 2, text: "Bob Johnson" },
  { id: 3, text: "Carol Williams" },
  { id: 4, text: "Frank Miller" },
  { id: 5, text: "Grace Brown" },
  { id: 6, text: "Henry Davis" },
  { id: 7, text: "Ivy Wilson" },
  { id: 8, text: "Jack White" },
  { id: 9, text: "Kelly Harris" },
  { id: 10, text: "Larry Martin" },
];

const testData = {

  tasks: [
    { id: 1, open:true, text: "Data Science"},
    { id: 5, open:true, text: "Web Development" }, 
    { id: 6, open:true, text: "Cybersecurity" },
    { id: 4, open:true, text: "Cloud Computing" },
    { id: 5, open:true, text: "Machine Learning" },
    { id: 6, open:true, text: "Programming" },
    { id: 9, open:true, text: "JavaScript"},
    { id: 11, open:true, text: "Python"},
    { id: 13, open:true, text: "Java"},
    { id: 15, open:true, text: "C#"},
    /// works on resizing parent with only with one child
    
    { id: 2, text: instructor_names[0].text, start_date: "2025-02-20", duration: 5, parent: 1 },
    { id: 3, text: instructor_names[1].text, start_date: "2025-02-21", duration: 10},
    { id: 4, text: instructor_names[2].text, start_date: "2025-02-22", duration: 5},
    { id: 7, text: instructor_names[5].text, start_date: "2025-02-25", duration: 6 },
    { id: 8, text: instructor_names[6].text, start_date: "2025-02-26", duration: 9 },
    { id: 10, text: instructor_names[8].text, start_date: "2025-02-28", duration: 3 },
    { id: 12, text: instructor_names[3].text, start_date: "2025-02-23", duration: 10 },
    { id: 14, text: instructor_names[4].text, start_date: "2025-02-24", duration: 8 },
    { id: 16, text: instructor_names[7].text, start_date: "2025-02-27", duration: 4 },
  ],
};

export default testData;
