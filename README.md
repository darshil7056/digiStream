

# DigiStream Project

The DigiStream project is a web application that provides a platform for users to stream and watch digital content. The project consists of two main components:

1. **digiStream_frontend**: This folder contains the frontend code for the DigiStream web application. It is built using React, a popular JavaScript library for building user interfaces. The frontend is responsible for the user interface and interactions with the application.

2. **digiStream_backend**: The backend folder contains the server-side code for the DigiStream application. It is developed using Node.js, a JavaScript runtime, along with a backend framework (e.g., Express.js) to handle user requests, manage data, and interact with the database.

## Getting Started

To get the DigiStream project up and running on your local machine, follow these steps:

1. **Clone the Repository**: Start by cloning this GitHub repository to your local machine using the following command:

   ```
   git clone https://github.com/your-username/digiStream.git
   ```

2. **Import Database**: Open PHPMyAdmin or any MySQL management tool and import the `digiStream.sql` file located in the root of the project. This will create the necessary database tables and populate them with initial data.

3. **Frontend Setup**:
   - Navigate to the `digiStream_frontend` folder.
   - Install the required dependencies using npm (Node Package Manager):
     ```
     npm install
     ```
   - If needed, update the backend API endpoint in the frontend code to match the URL where the backend server is running. Look for the base URL in files that make API calls (e.g., Axios requests).

4. **Backend Setup**:
   - Navigate to the `digiStream_backend` folder.
   - Install the required dependencies using npm:
     ```
     npm install
     ```
   - Configure the database connection in the backend code to match your local database settings (host, username, password, database name, etc.).

5. **Run the Application**:
   - Start the backend server first:
     ```
     npm start
     ```
     This will start the backend server on your local machine, and it will be listening on a specified port (e.g., 5000).

   - Then, start the frontend server:
     ```
     npm start
     ```
     This will launch the frontend application on your local machine, and you can access it using your web browser at `http://localhost:3000` or another port if specified.



---

Again, please ensure you customize the instructions with the appropriate values for your project. This updated template should give you a more accurate representation of the DigiStream project with Node.js backend and React frontend.
