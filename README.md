# React + Vite + Gantt Charts

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Project Brief

The goal of this project is to develop a custom scheduling application tailored for course administrators and managers. The system will enable them to book courses in advance, assign instructors, and make adjustments such as rescheduling courses or shifting instructors. This is why drag-and-drop functionality and real-time editability are crucial to the design.

Unlike student-facing systems, this scheduler is exclusively for administrative use and will not be accessible to students. Administrators will benefit from tools like conflict detection to prevent overlapping schedules for instructors while allowing certain exceptions (e.g., double bookings for separate cohorts).

## Features

### Existing Packages
- **React**: A JavaScript library for building user interfaces.
- **Vite**: A build tool that provides a fast development environment.
- **DHTMLX Gantt**: A Gantt chart library for creating interactive project management applications.
- **React Scheduler**: A React component for scheduling and calendar applications.
- **FontAwesome**: A library for scalable vector icons.

### New Functionality
1. **Course Scheduling**:
   - Book courses with details such as titles, instructors, descriptions, dates, and duration.
   - Easily reschedule and update courses as needed.

2. **Instructor Management**:
   - Assign instructors to courses and adjust their schedules.
   - Manage instructor profiles, including names, roles, and assigned courses.

3. **Conflict Detection**:
   - Detect potential conflicts in instructor availability or course schedules, while allowing exceptions for specific scenarios.

4. **Drag-and-Drop Interface**:
   - A user-friendly interface to rearrange courses and instructors with drag-and-drop functionality.

5. **Editable Schedule**:
   - Allow administrators to make adjustments to schedules, such as reassigning instructors or shifting course times when unforeseen circumstances arise.

6. **Secure Authentication and Deployment**:
   - Only authorized users can access the system.
   - The application will be hosted online, making it accessible to administrators from multiple locations.

7. **Draft Modes**:
   - Easy to duplicate or create alternative schedules (drafts) by using separate Gantt instances or states.

8. **Integration**:
   - Works well with React and JavaScript. There’s an official DHTMLX Gantt React wrapper.

9. **Import/Export Options**:
   - Built-in support for importing/exporting to Excel for reporting and use in the ScheduleIt application.

## How to Use This

### Prerequisites
- Node.js and npm installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/super-adaptix-2.git
   cd super-adaptix-2

2. Install dependencies:
Development
To start the development server with hot module replacement:
npm run dev

3. Build
To build the project for production:
npm run build

4. Preview
To preview the production build:
npm run preview

5. Lint
To lint the codebase:
npm run lint

Environment Variables
Create .env.development and .env.production files in the root of your project to manage environment-specific configurations.

.env.development
VITE_USE_LOCAL_DATA=true
.env.production
VITE_USE_LOCAL_DATA=false


### Summary

1. **Existing Packages**: Clearly list the existing packages you are building off.
2. **New Functionality**: Describe the new features you have added.
3. **How to Use This**: Provide a guide on how to install, develop, build, and preview the project, as well as how to manage environment variables.

By following these steps, you can make it clear what parts of the work are your additions and provide a helpful guide for users to get started with the project.
