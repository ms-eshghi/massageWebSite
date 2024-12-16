#MassageWebsite Report

Working Instance of the Project: https://massagewebsite.netlify.app/

Technical Support Contact: Email: Fatemeh.Eshghi@student.lut.fi

GitHub Repository: https://github.com/ms-eshghi/massageWebSite 

//The repository includes:

Source Codes:

Full implementation in React (frontend), Node.js/Express (backend), MongoDB (database), and React Bootstrap (styling).
Technologies Used:
Frontend: React, React Bootstrap
Backend: Node.js, Express.js
Database: MongoDB
Hosting: Netlify (frontend), Render (backend)

//Overview

MassageWebsite is an intuitive online platform that allows users to seamlessly book massage appointments, manage reservations, and explore various massage options. The system provides role-based access for users and administrators, ensuring secure and efficient functionality. Below is a detailed analysis of the key features and functionalities.



//Features

Public User Functionality


--Homepage:
click on Booking button to go to reservation page. 


--Booking: Because rendering is used, it may take a while to load. If it takes too long, refresh once.

Address

Massage Types

Price Information

Descriptions

Users can click "View Details" to expand and view the detailed information.



--Booking System:

Users can select a date and time for their desired massage service.


--Registration Requirement:

If users are not registered, they are directed to the registration page.

Registered users can log in with their email and password.



--User Profile:

Logged-in users can access their profile to:

View personal details.

Manage reservations, including cancellation options.


--Admin Functionality

Admin Panel Access:

Accessible at Admin Panel(https://massagewebsite.netlify.app/admin) with the following credentials:

Email: feshghi@gmail.com

Password: 1234



--Admin Features:

Add new massage places to the database.

Manage users, including viewing their details.

Review, modify, or manage all bookings.

*****
To run the app locally
Download the repository and follow these instructions.
First you need to set up your own MongoDB connection (use MongoDB Atlas (Cloud-Based)):
1. Create a free account at MongoDB Atlas.
2. Set up a new cluster.
3. Whitelist your IP in Atlas (or allow access from any IP for development purposes).
4. Get your connection string from Atlas, which will look something like this: 
mongodb+srv://<username>:<password>@cluster0.mongodb.net/<databaseName>?retry
Writes=true&w=majority
5. Create a .env File in the root directory of the project.
6. Add your MONGO_URI=[your connection string]
Next you can modify the code and run the application:
1. Change urls to work on local running. ( files can be found from paths: server/server.js, 
src/hooks/usePostReservations.js, src/hooks/useReservations.js )
2. Run npm install to install required dependencies.
3. To run the application, run npm start , this will run the server and client simultaneously.

*****
What technologies will be used to implement the front end?
• React: The main framework for building the user interface to be dynamic and a 
component-based.
• React Router: For handling navigation between pages (e.g., home and reservations).
• JavaScript: Core programming language.
• Fetch API: For making HTTP requests to the backend.
• Netlify: To host the front end publicly.
-------
Are there other choices that could do the same?
Yes, alternatives exist for these technologies:
• Vue.js or Angular instead of React: Both are robust frameworks for building dynamic 
front ends.
• OpenLayers instead of Leaflet: Another option for interactive maps.
• Render or other hosting platform for hosting the whole application.
Why not use these other choices?
The chosen technologies are preferred because:
• React has a larger community and ecosystem, making it easier to find resources and 
libraries. I also wanted to challenge myself and learn React.
• Leaflet is well-documented and widely used, providing reliability and ease of integration
with React.
• I chose to use Netlify in the beginning, and found only later that it wouldn’t support to 
hosting my backend. I still decided to use Netlify for the frontend since I already had 
deployed it there.

Are there any wireframes or diagrams guiding these choices?
No
-------
Are there other choices that could do the same?
Yes, alternatives exist for these technologies:
• Vue.js or Angular instead of React: Both are robust frameworks for building dynamic 
front ends.
• OpenLayers instead of Leaflet: Another option for interactive maps.
• Render or other hosting platform for hosting the whole application.
Why not use these other choices?
The chosen technologies are preferred because:
• React has a larger community and ecosystem, making it easier to find resources and 
libraries. I also wanted to challenge myself and learn React.
• Leaflet is well-documented and widely used, providing reliability and ease of integration
with React.
• I chose to use Netlify in the beginning, and found only later that it wouldn’t support to 
hosting my backend. I still decided to use Netlify for the frontend since I already had 
deployed it there.

Are there any wireframes or diagrams guiding these choices?
No
-------


