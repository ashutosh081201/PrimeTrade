
# Note-Taking App

A This is a modern, responsive note-taking application built with the MERN stack (MongoDB, Express, React, Node.js). It provides a seamless and intuitive user experience for creating, managing, and organizing your notes.
[![Dashboard-Project.png](https://i.postimg.cc/NGH7TdmM/Dashboard-Project.png)](https://postimg.cc/mhTHWNdf)
[![project_Login.png](https://i.postimg.cc/0jwfyfd5/project_Login.png)](https://postimg.cc/p5P80K63)


## Features

*   **User Authentication:** Secure user registration and login system with JWT-based authentication.
*   **CRUD Functionality:** Create, read, update, and delete notes with ease.
*   **Rich Text Editing:** A user-friendly interface for formatting and organizing note content.
*   **Responsive Design:** A fully responsive layout that works on all devices, from desktops to mobile phones.
*   **Modern UI:** A clean and modern user interface built with Material-UI, featuring a premium look and feel.
*   **User Profiles:** A dedicated page for users to view and manage their profile information.
*   **Interactive Dashboard:** A central hub for users to get an overview of their notes and activities.

## Technologies Used

### Frontend

*   **React:** A JavaScript library for building user interfaces.
*   **Vite:** A next-generation frontend tooling for a faster and leaner development experience.
*   **Material-UI:** A popular React UI framework for faster and easier web development.
*   **Axios:** A promise-based HTTP client for the browser and Node.js.
*   **React Router DOM:** A standard library for routing in React.
*   **JWT Decode:** A small browser library to decode JWTs.

### Backend

*   **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
*   **Express:** A fast, unopinionated, minimalist web framework for Node.js.
*   **MongoDB:** A cross-platform document-oriented database program.
*   **Mongoose:** An elegant MongoDB object modeling for Node.js.
*   **bcryptjs:** A library to help you hash passwords.
*   **jsonwebtoken:** An implementation of JSON Web Tokens.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js and npm
*   MongoDB

### Installation

1.  **Clone the repo:**
    ```sh
    git clone https://github.com/your_username/your_project_name.git
    ```
2.  **Install backend dependencies:**
    ```sh
    cd backend
    npm install
    ```
3.  **Install frontend dependencies:**
    ```sh
    cd ../frontend
    npm install
    ```

### Configuration

1.  Create a `.env` file in the `backend` directory.
2.  Add the following environment variables:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

### Running the Application

1.  **Start the backend server:**
    ```sh
    cd backend
    npm start
    ```
2.  **Start the frontend development server:**
    ```sh
    cd ../frontend
    npm run dev
    ```


