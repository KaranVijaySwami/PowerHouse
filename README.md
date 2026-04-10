# PowerHouse
 Hyper-local City Services and Business Discovery Platform . 
CityHub Pro is a high-performance, full-stack local service marketplace designed to connect residents of Jamshedpur with service providers in real-time.

🛠️ Updated Technology Stack
Layer	Technology
Frontend	HTML5, CSS3, Vanilla JavaScript, Leaflet.js
Server-Side	Node.js with Express.js
Database	SQL (MySQL/PostgreSQL)
Authentication	JWT (JSON Web Tokens) or Session-based Auth
APIs	RESTful Endpoints, Web Speech API, Geolocation API
📂 Revised Project Architecture
The application follows a standard Client-Server architecture to ensure data persistence and security:

/client: Contains the frontend logic, CSS variables for theming, and Leaflet map initialization.

/server (Node.js):

Handles API routing for user authentication and vendor registration.

Manages "Lead Box" submissions and booking logic.

Processes voice-to-text search queries on the backend if advanced NLP is required.

/database (SQL):

Users Table: Stores resident and vendor credentials.

Listings Table: Manages the 150+ service provider profiles, ratings, and coordinates.

Leads/Bookings Table: Relational mapping between customers and service requests.

🔑 Key Full-Stack Features
Relational Data Integrity: Using SQL to manage complex relationships between Vendors, Service Categories, and User Reviews.

Persistent Portals: Vendor revenue, schedules, and service menus are now saved to the SQL database, ensuring data isn't lost on page refresh.

Secure Auth: JavaScript-based server logic ensures that Vendor "HubBiz" dashboards are protected and only accessible to authorized owners.

Dynamic Lead Management: When a resident clicks "Inquiry," the Node.js server triggers a database update, instantly reflecting in the Vendor’s Lead Box.

🚦 Setup & Installation
Database: Import the provided .sql schema to initialize your tables.

Server: Navigate to the root directory and run npm install to set up Express and SQL drivers.

Environment: Configure your .env file with your SQL credentials and Server Port.

Launch: Run node server.js to start the backend, then serve the frontend through the Express static middleware.

Version Note: The transition to a Node.js + SQL stack in v9.2 enables real-world scalability, allowing CityHub to handle thousands of concurrent users across Jamshedpur's zones.
