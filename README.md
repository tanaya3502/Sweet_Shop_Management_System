# Sweet-Shop-Management-System  
  
The Sweet Shop Management System is a full-stack web application designed to streamline sweet inventory management and sales. Built with React for the frontend and Spring Boot for the backend, the system allows users to register, login, view available sweets, and make purchases, while administrators have full control to add, update, delete, and restock sweets. The application uses JWT-based authentication and role-based access control to ensure secure operations, and a MySQL database stores persistent user and sweet data. It demonstrates a modern single-page application (SPA) architecture with a clean separation of concerns, including controllers, services, repositories, and secure API endpoints.  

***Test Report : https://docs.google.com/document/d/1Quuh616TqwZkaGuyPp9fi30FO3LLCCyx/edit?usp=sharing&ouid=116060729193506149296&rtpof=true&sd=true***  
  
***Application Screenshorts : https://docs.google.com/document/d/1eYmslLgjLAVuiCw6-_pyCD6U9Qyrjfi_/edit?usp=sharing&ouid=116060729193506149296&rtpof=true&sd=true***  
  
## Project Overview  
The Sweet Shop Management System is a full-stack web application built with React (frontend) and Spring Boot (backend). It allows:  
•	Users to register, login, and purchase sweets.  
•	Admins to manage sweets (CRUD operations) and inventory (restock).  
•	Role-based access with JWT authentication.  
•	Real-time inventory control and search/filter options.  
The application demonstrates a modern single-page application (SPA) architecture with a secure and RESTful backend.  

## Features
•  User registration and login with JWT authentication  
•  Role-based access (USER vs ADMIN)  
•  Profile management with secure token validation  
•  Admin can add, update, delete, and restock sweets  
•  Users can browse sweets, search by category, and purchase  
•  Real-time inventory updates after purchase or restock  
•  Access restrictions: USER cannot perform admin tasks  
•  MySQL database for persistent user, role, and sweet data  
•  React frontend with Spring Boot backend integration  
•  Secure REST APIs with proper status codes and error handling  

## Technologies Used
•	Frontend: React, HTML, CSS, JS
•	Backend: Java Spring Boot, Spring Security, JPA/Hibernate
•	Database: MySQL
•	Tools: Postman, STS IDE (Spring Tool Suite)
•	Authentication: JWT (JSON Web Token)

## Project Structure  
Sweet_Shop_Management_System/  
│  
├── src/  
│   ├── main/  
│   │   ├── java/in/ss/main/  
│   │   │   ├── config/                
│   │   │   │   ├── SecurityConfig.java  
│   │   │   │   └── DataInitializer.java  
│   │   │   │  
│   │   │   ├── controller/         
│   │   │   │   ├── AuthController.java  
│   │   │   │   ├── SweetController.java  
│   │   │   │   └── InventoryController.java  
│   │   │   │  
│   │   │   ├── dto/                   
│   │   │   │   ├── AuthRequest.java  
│   │   │   │   ├── LoginRequest.java  
│   │   │   │   ├── RegisterRequest.java  
│   │   │   │   ├── SweetRequest.java  
│   │   │   │   └── SweetResponse.java  
│   │   │   │  
│   │   │   ├── entities/            
│   │   │   │   ├── User.java  
│   │   │   │   ├── Sweet.java  
│   │   │   │   └── Role.java  
│   │   │   │  
│   │   │   ├── exception/        
│   │   │   │   ├── InvalidCredentialsException.java  
│   │   │   │   ├── GlobalExceptionHandler.java  
│   │   │   │   ├── UserAlreadyExistsException.java  
│   │   │   │   └── UserNotFoundException.java  
│   │   │   │  
│   │   │   ├── repository/       
│   │   │   │   ├── UserRepository.java  
│   │   │   │   ├── AuthService.java  
│   │   │   │   └── SweetRepository.java  
│   │   │   │  
│   │   │   ├── service/               
│   │   │   │   ├── AuthServiceImpl.java  
│   │   │   │   ├── SweetService.java  
│   │   │   │   ├── SweetServiceImpl.java  
│   │   │   │   ├── InventoryService.java  
│   │   │   │   ├── InventoryServiceImpl.java  
│   │   │   │   └── JwtService.java  
│   │   │   │  
│   │   │   ├── security/              
│   │   │   │   ├── CustomUserDetails.java  
│   │   │   │   ├── JwtAuthenticationFilter.java  
│   │   │   │  
│   │   │   └── SweetShopManagementSystemApplication.java    
│   │   │  
│   │   └── resources/  
│   │       ├── application.properties    
│   │       ├── data.sql                  
│   │       └── schema.sql             
│   │  
│   └── test/  
│       └── java/in/ss/main/  
│           ├── AuthControllerTest.java  
│           ├── SweetServiceTest.java  
│           └── InventoryServiceTest.java  
│  
└── pom.xml  
│  
├── frontend/                        
│   ├── public/  
│   │   ├── index.html  
│   │   └── favicon.ico  
│   │  
│   ├── src/  
│   │   ├── api/                     
│   │   │   └── axios.js  
│   │   │  
│   │   ├── components/              
│   │   │   ├── Header.js  
│   │   │   ├── AdminPage.js  
│   │   │   ├── Dashboard.js  
│   │   │   ├── Login.js  
│   │   │   ├── SweetCard.js  
│   │   │   └── Register.js  
│   │   │  
│   │   ├── context/                 
│   │   │   └── AuthContext.js  
│   │   │  
│   │   ├── utils/                   
│   │   │   └── jwt.js  
│   │   │  
│   │   ├── App.js                   
│   │   ├── index.js                
│   │   └── App.css                 
│   │  
│   ├── package.json  
│   └── README.md  
│  
└── README.md                  

## Backend  

### Spring Boot Dependencies  
•  **Spring Boot Starter Web →** for building REST APIs  
•  **Spring Boot Starter Data JPA →** ORM with Hibernate  
•  **Spring Boot Starter Security →** Spring Security integration  
•  **Spring Boot Starter Validation →** request validation   
•  **Spring Boot Starter Test →** testing support  
•  **MySQL Driver →** MySQL database connectivity  
•  **Lombok →** reduce boilerplate code  
•  **jjwt (Java JWT) or spring-security-jwt →** JWT token generation & parsing  

### API Endpoints (Module-wise)
**Authentication Module**  
    - POST /api/auth/register → Register a new user (USER by default)  
    - POST /api/auth/login → Authenticate user and return JWT  
**Sweet Management Module** 
    - POST /api/sweets → (Admin) Add a new sweet  
    - GET /api/sweets → List all sweets  
    - GET /api/sweets/{id} → Get details of one sweet  
    - GET /api/sweets/search?name=Chocolate → Search sweets by category  
    - PUT /api/sweets/{id} → (Admin) Update sweet details  
    - DELETE /api/sweets/{id} → (Admin) Delete sweet  
**Inventory Management Module**  
    - POST /api/sweets/{id}/purchase → (User) Purchase a sweet (quantity--)  
    - POST /api/sweets/{id}/restock → (Admin) Restock a sweet (quantity++)  

## Frontend  

### React Dependencies (Frontend)  
- react & react-dom → Core React  
- react-router-dom → Routing (Login, Register, Dashboard, Admin Page, etc.)  
- axios → API calls to backend (Authorization: Bearer <token>)  
- jwt-decode → Decode JWT to extract role/username if needed  

### Frontend Modules
**Authentication (Login & Register)**  
- Login Page  
- Form: username/email, password  
- API: POST /api/auth/login → returns {token, role}  
- Store token in localStorage & role in AuthContext  
    
***Redirect:***  
- Admin → Admin Page 
- User → Dashboard  
- Register Page  
- Form: username, email, password  
- API: POST /api/auth/register  
- Only normal users register (admins seeded manually in DB)  

**Dashboard (User & Admin)**  
- Shared dashboard for both roles:  
        - API: GET /api/sweets → list sweets  
        - API: GET /api/sweets/search → search sweets by name/category/price  
- SweetCard component → shows name, category, price, stock  
- Normal user → can purchase (POST /api/sweets/:id/purchase)  
- Purchase button disabled if stock = 0  

**Admin Page**  
- Role: Admin only (frontend route protection + backend role check)  
APIs:  
- POST /api/sweets → add sweet  
- PUT /api/sweets/:id → update sweet  
- DELETE /api/sweets/:id → delete sweet  
- POST /api/sweets/:id/restock → restock sweet

## Testing  
Testing APIs  
•	Use Postman for testing backend endpoints  
•	Ensure JWT is added in Authorization: Bearer <token> header for protected APIs  
•	Positive & Negative test cases implemented:  
  - Register/Login  
  - CRUD sweets  
  - Purchase & Restock  
  - Role-based access  

## How to Use  
- Register: Create a new user account  
- Login: Log in with your credentials to receive a JWT token  
- Browse Sweets: View all available sweets on the dashboard  
- Search Sweets: Search sweets by name, category, or price  
- Purchase Sweet: Buy a sweet (stock decreases automatically)  
- Add Sweet (Admin): Add new sweets with name, category, price, and quantity  
- Update Sweet (Admin): Update sweet details such as price or stock  
- Delete Sweet (Admin): Delete sweets that are no longer available  
- Restock Sweet (Admin): Increase inventory for existing sweets  
- Logout: Securely log out (JWT token removed)

## Future Enhancements
- Implement payment gateway integration for online transactions  
- Add order history and invoice generation for users  
- Introduce discounts, offers, and loyalty points  
- Enable real-time notifications for stock updates and order status  
- Build a mobile application for better accessibility  
- Add analytics dashboard for sales and inventory insights  

## Acknowledgements
- Spring Boot: Used to create RESTful APIs for backend services  
- React: Used to build the frontend and create a smooth user interface 
- MySQL: Used as the relational database to store users, sweets, and inventory data  
- Postman: Used to test APIs during development  
- Axios: Used in React for making secure API calls to the backend

## Key Points  
•	All passwords are hashed using BCrypt  
•	JWT tokens include role and expire after a set time  
•	Admin-only endpoints are protected both in backend (@PreAuthorize) and frontend (UI + route guards)  
•	Transactional operations (purchase/restock) prevent race conditions   
  

My AI Usage:   
  
For this project, I leveraged AI tools to assist with certain parts of the development process:  
1.	Frontend (React SPA & JWT Integration):   
•	I have strong experience with backend development and also knowledge of frontend (HTML, CSS, JS for validation), but only basic knowledge of frontend frameworks  
•	I used ChatGPT to help implement the connection between the Spring Boot backend and the React frontend, including sending JWT tokens, protecting routes, and managing role-based UI  
•	It also assisted in structuring components, handling state, and creating forms for login, registration, and dashboard functionality  
2.	Report Generation / Documentation:  
•	ChatGPT helped draft structured test cases, project workflow, and detailed README sections  
•	It assisted in organizing information, summarizing modules, and formatting the documentation to make it clear and professional  
Reflection: Using AI significantly accelerated frontend development, helped me bridge gaps in framework-specific knowledge, and allowed me to focus on securely integrating backend functionality while maintaining a clean and functional UI  
