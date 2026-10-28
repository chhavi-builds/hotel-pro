# HotelPro: Full-Stack Hotel Management System

A full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js). This project implements a strict Model-View-Controller (MVC) architecture and features role-based access control (RBAC) to serve both administrators and customers through a unified platform.

## Tech Stack
* **Frontend:** React (Vite), React Router DOM, React Bootstrap, Axios
* **Backend:** Node.js, Express.js, JSON Web Tokens (JWT) for authentication, bcrypt for password hashing
* **Database:** MongoDB, Mongoose ODM

## Core Features
* **Role-Based Routing:** Secure authentication system directing 'Admin' and 'Ordinary' users to distinct, protected dashboard environments.
* **Admin Capabilities:** Add and manage room inventory with image URLs, view system-wide reservation history, and monitor all registered users.
* **Customer Capabilities:** Browse available rooms, calculate dynamic stay costs based on date selection, process mock checkout payments, and manage/cancel active personal reservations.

## Local Installation Guide

**Prerequisites**
Ensure you have Node.js and MongoDB Community Server installed and running locally on your machine.

**1. Clone the Repository**
```powershell
git clone [https://github.com/YOUR_GITHUB_USERNAME/HotelPro.git](https://github.com/YOUR_GITHUB_USERNAME/HotelPro.git)
cd HotelPro
```

**2. Backend Setup & Environment Variables**
Open a terminal, navigate to the server folder, and install the required dependencies:
```powershell
cd server
npm install
```
Create a `.env` file inside the `server` directory and add the following connection variables:
```env
PORT=8001
MONGO_URI=mongodb://127.0.0.1:27017/Roomly
JWT_SECRET=hotelpro_evaluator_secret_key
```
Start the Node server:
```powershell
npx nodemon index.js
```

**3. Frontend Setup**
Open a second, separate terminal window, navigate to the client folder, and install the React dependencies:
```powershell
cd client
npm install
```
Start the Vite development server:
```powershell
npm run dev
```

**4. Access the Application**
Open your browser and navigate to `http://localhost:5173`. 
To test the Admin dashboard, register a new account and explicitly select "Admin" from the User Type dropdown on the registration form.

## Author
**Dhawal Jain**
* **Institution:** Medi-Caps University

## Acknowledgments
* Developed as a full-stack MERN project submission for the college program evaluation.
