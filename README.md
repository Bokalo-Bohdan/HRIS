##MedHRIS — Medical Personnel Management System
MedHRIS is a specialized internal HR platform designed for medical institutions to automate shift tracking, medication usage logging, and personnel earnings monitoring.

##Core Functionality
Smart Dashboard: Interactive control panel with live shift tracking. The system automatically calculates work progress based on a 2/2 rotation schedule and real-time clock synchronization.

Automated Scheduling: Calendar grid featuring shift visualization. Includes automated calculation of completed workdays and remaining shifts for the current month.

Medication Inventory: Usage logging system with critical stock level tracking and automated alerts for supply shortages.

Payroll Processing: Transparent financial tracking for each working day. Automated calculation of total earnings based on hours worked and hourly rates.

Animated UX: Implementation of the GSAP library for fluid page transitions and dynamic interface element rendering.

##Technical Stack
Frontend: React 18, TypeScript

Styling: CSS3 (Modern Flexbox & Grid, CSS Variables)

Animations: GSAP (GreenSock Animation Platform)

Build Tool: Vite

Navigation: React Router (State-managed SPA architecture)

##Installation and Setup
Clone the repository:

git clone https://github.com/your-username/med-hris.git
Navigate to the project directory:

cd med-hris
Install dependencies:

npm install
Launch the development server:

npm run dev
Open http://localhost:5173 in your browser.

##Project Structure
src/components/ — Reusable interface blocks (Sidebar, TopBar, AnimatedPage).

src/pages/ — Primary application screens (Dashboard, Schedule, Medications, Payroll).

src/styles/ — Global styling and CSS variables.

src/types/ — TypeScript interface definitions and type guards.

##Roadmap
Integration with backend services (Firebase/PostgreSQL).

Role-based access control (Administrator/Nurse).

PDF report generation for payroll and inventory.

Real-time notification system for shift changes.