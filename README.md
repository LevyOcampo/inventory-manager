# Inventory Management System  

This project is a **full-stack inventory management system** built with React (frontend) and Node.js/Express (backend). It uses **MySQL** for database management and **Sequelize** as an ORM.

## 🛠️ Technologies Used  

### **Frontend (`inventory-manager`)**  
- **React** (v18.3) - UI Framework  
- **Vite** - Development & Build Tool  
- **React Router DOM** - Client-side routing  
- **React Icons** - Icons for UI components  
- **Axios** - HTTP client for API requests  
- **Bootstrap** - Styling  

### **Backend (`inventory-backend`)**  
- **Node.js** (JavaScript runtime)  
- **Express.js** - Web framework for Node.js  
- **MySQL2** - MySQL database client  
- **Sequelize** - ORM for database management  
- **dotenv** - Environment variable management  
- **CORS** - Middleware for handling cross-origin requests  

---

## 🚀 Getting Started  

### **1️⃣ Clone the Repository**  
```sh
git clone <your-repo-link>
cd inventory-manager
🏗️ Frontend Setup
2️⃣ Install Dependencies
sh
Copy
Edit
cd inventory-manager
npm install
3️⃣ Start the Development Server
sh
Copy
Edit
npm run dev
The React app should now be accessible at http://localhost:5173/.

🖥️ Backend Setup
4️⃣ Install Dependencies
sh
Copy
Edit
cd inventory-backend
npm install
5️⃣ Set Up Environment Variables
Create a .env file in the inventory-backend folder and configure your database connection:

ini
Copy
Edit
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
6️⃣ Start the Backend Server
sh
Copy
Edit
node index.js
The backend should now be running on http://localhost:3000/.

🔗 Connecting Frontend and Backend
Open inventory-manager/src/api.js (or equivalent API config file).
Set the backend API URL to match your Express server's address (e.g., http://localhost:3000).
Restart both servers if necessary.
🛠️ Additional Scripts
Command	Description
npm run dev	Starts the frontend in development mode
npm run build	Builds the frontend for production
npm run preview	Previews the production build
node index.js	Starts the backend
📌 Notes
Ensure MySQL is installed and running before starting the backend.
You may need to migrate or seed your database with Sequelize.
If you encounter CORS errors, update the Express CORS middleware settings.
