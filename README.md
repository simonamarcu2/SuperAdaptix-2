# React + Vite + Gantt Charts

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.


**Project Brief**
Project Brief
The goal of this project is to develop a custom scheduling application tailored for course administrators and managers. The system will enable them to book courses in advance, assign instructors, and make adjustments such as rescheduling courses or shifting instructors. This is why drag-and-drop functionality and real-time editability are crucial to the design.

Unlike student-facing systems, this scheduler is exclusively for administrative use and will not be accessible to students. Administrators will benefit from tools like conflict detection to prevent overlapping schedules for instructors while allowing certain exceptions (e.g., double bookings for separate cohorts).

The scheduler will feature:
1.	Course Scheduling:
•	Book courses with details such as titles, instructors, descriptions, dates and duration.
•	Easily reschedule and update courses as needed.
2.	Instructor Management:
•	Assign instructors to courses and adjust their schedules ~~based on availability.~~
•	~~Create and manage instructor profiles, including names, roles, availability, and assigned courses.~~
**3.	Conflict Detection:
•	Detect potential conflicts in instructor availability or course schedules, while allowing exceptions for specific scenarios.**
4.	Drag-and-Drop Interface:
•	A user-friendly interface to rearrange courses and instructors with drag-and-drop functionality.
5.	Editable Schedule:
•	Allow administrators to make real-time adjustments to schedules, such as reassigning instructors or shifting course times when unforeseen circumstances (e.g., instructor illness) arise.
**6.	Secure Authentication and Deployment:
•	Only authorized users can access the system.
•	The application will be hosted online, making it accessible to administrators from multiple locations.**
**7.	Draft Modes:
•	Easy to duplicate or create alternative schedules (drafts) by using separate Gantt instances or states.**
8	Integration:
	•	Works well with React and TypeScript. There’s an official DHTMLX Gantt React wrapper.
**9.	Import/Export Options:
	•	Built-in support for importing/exporting to Excel for reporting and be used in ScheduleIt application.**
By addressing these needs, the system will simplify the scheduling process, reduce manual errors, and improve operational efficiency for course administrators.
