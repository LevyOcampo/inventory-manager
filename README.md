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

🚀 Getting Started
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/LevyOcampo/inventory-manager.git
cd inventory-manager
📂 Project Structure
bash
Copy
Edit
inventory-manager/
├── inventory-frontend/     # React (Vite) frontend
├── inventory-backend/      # Node.js + Express backend
└── README.md
🖥️ Frontend Setup
Navigate to the frontend folder:

bash
Copy
Edit
cd inventory-frontend
Install dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm run dev
The frontend should now be running at http://localhost:5173

🛠️ Backend Setup
Navigate to the backend folder:

bash
Copy
Edit
cd ../inventory-backend
Create a .env file with your database credentials:

env
Copy
Edit
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=inventory_db
Install dependencies:

bash
Copy
Edit
npm install
Start the server:

bash
Copy
Edit
node index.js
The backend should now be running at http://localhost:3000

🗃️ Database Setup
Create the MySQL database:

sql
Copy
Edit
CREATE DATABASE inventory_db;
The tables are automatically created by Sequelize when the backend starts. Make sure your database credentials in .env are correct.

🌐 Connecting Frontend to Backend
Ensure that your frontend API calls (e.g., fetch, axios) are pointed to http://localhost:3000. You may also set up a proxy in vite.config.js for development convenience.

✅ Done!
You should now be able to use the Inventory Manager app locally.

If you run into any issues or need additional support, feel free to open an issue or contact the maintainer.
