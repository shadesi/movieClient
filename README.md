# MyFlix App :   


https://shadesi-movies.netlify.app/login 
                 
https://movie-api-c3t5.onrender.com/ 
                 

MyFlix is a movie-based web application that allows users to browse through a vast collection of movies, view detailed information about each movie, and manage their personal movie list. The app is designed to be intuitive and user-friendly, making it easy to find movies, get recommendations, and keep track of favorites.

## Features

- Browse a collection of movies with various genres, directors, and actors.
- View detailed information about each movie, including description, genre, director, and cast.
- Create a personal profile with a list of favorite movies.
- Add or remove movies from your favorites list.
- Responsive design that works seamlessly across devices.

## Technologies Used

- **Frontend**: React.js, HTML, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **API**: RESTful API built with Node.js and Express
- **Version Control**: Git, GitHub
- **Hosting**: Netlify, Render
  
## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash

  git clone https://github.com/shadesi/myflix-app.git
  

2. Navigate to the project directory:


cd myflix-app


3. Install dependencies:

   npm install

4. Run the app:

   npm start

The app will be running locally at http://localhost:3000.

API Endpoints
Method	    Endpoint	                   Description
GET	        /movies	                     Get a list of all movies
GET	        /movies/:id	                 Get details about a specific movie
GET	        /genres/:genre	             Get all movies of a specific genre
GET	        /directors/:name	           Get details about a specific director
POST	      /users	                     Register a new user
PUT	        /users/:username	           Update user details
DELETE	    /users/:username	           Delete a user account
POST	      /users/:username/movies	     Add a movie to the user's favorites list
DELETE	/users/:username/movies	         Remove a movie from the favorites list


User Stories
As a user, I want to be able to view a list of all movies.
As a user, I want to be able to filter movies by genre or director.
As a user, I want to be able to add or remove movies from my favorites.
As a user, I want to update my user profile.
As a user, I want to be able to create a new account and log in.


Project Structure

  .
├── client/                    # Frontend React app
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── services/          # API services
│   │   ├── App.js             # Main App component
│   │   └── index.js           # Entry point
├── server/                    # Backend Express app
│   ├── models/                # Mongoose models
│   ├── routes/                # API routes
│   ├── server.js              # Main entry point
├── README.md                  # Project documentation
└── package.json               # Node.js dependencies


License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For any inquiries or support, feel free to reach out to:

Developer: Shane de Silva
Email: shane@example.com
GitHub: https://github.com/shadesi


