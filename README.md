AgriSmart - Farm Marketplace Platform

AgriSmart is a modern farm-to-table marketplace platform that connects local farmers directly with buyers, enabling fresh organic produce delivery straight to customers' doorsteps.

![AgriSmart](https://img.shields.io/badge/Status-Active-success)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![React](https://img.shields.io/badge/React-v18.2-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-v6+-green)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### For Buyers
- 🛒 Browse fresh farm produce by category
- 🔍 Advanced product search and filtering
- 💳 Secure checkout process
- 📦 Order tracking
- 👤 User profile management
- 🛍️ Shopping cart functionality

### For Farmers
- 📝 Product listing and management
- 📊 Sales analytics dashboard
- 💰 Revenue tracking
- 📈 Order management
- 🌾 Inventory control

### General Features
- 🎨 Modern, responsive UI design
- 🔐 Secure authentication system
- 💬 Real-time updates with Socket.IO
- 📱 Mobile-friendly interface
- 🌐 RESTful API architecture

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI library
- **React Router DOM 6.15** - Client-side routing
- **Bootstrap 5.3** - CSS framework
- **Axios** - HTTP client
- **Socket.IO Client** - Real-time communication

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Socket.IO** - WebSocket library
- **dotenv** - Environment configuration
- **CORS** - Cross-origin resource sharing

## 📦 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)
- **npm** or **yarn** package manager

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/agrismart.git
cd agrismart
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agrismart
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_key_here
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory (from root)
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit the `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Seed Database (Optional)
```bash
# From backend directory
cd backend
node seedProducts.js
```

This will populate your database with sample products.

## 🏃 Running the Application

### Development Mode

You need to run both backend and frontend servers simultaneously.

#### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5000`

#### Terminal 2 - Frontend Server
```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### Production Mode

#### Backend
```bash
cd backend
npm start
```

#### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 📁 Project Structure
```
AgriSmart/
├── backend/
│   ├── controllers/
│   │   └── productController.js
│   ├── models/
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── cart.js
│   │   ├── orders.js
│   │   └── analytics.js
│   ├── middleware/
│   │   └── auth.js
│   ├── socket/
│   │   └── socket.js
│   ├── server.js
│   ├── seedProducts.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Products.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── BuyerDashboard.jsx
│   │   │   └── FarmerDashboard.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── Products.css
│   │   │   ├── Dashboard.css
│   │   │   └── Navbar.css
│   │   ├── utils/
│   │   │   └── AuthContext.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Farmer only)
- `PUT /api/products/:id` - Update product (Farmer only)
- `DELETE /api/products/:id` - Delete product (Farmer only)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update/:id` - Update cart item
- `DELETE /api/cart/remove/:id` - Remove from cart

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create new order
- `PUT /api/orders/:id` - Update order status

### Analytics
- `GET /api/analytics/dashboard` - Get dashboard stats

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/agrismart
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_secret_key
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🎯 Key Features Explained

### Product Categories
- **Vegetables** - Fresh organic vegetables
- **Fruits** - Seasonal and tropical fruits
- **Grains** - Whole grains and cereals
- **Dairy** - Farm-fresh dairy products
- **Organic** - Certified organic products

### User Roles
- **Buyer** - Can browse and purchase products
- **Farmer** - Can list and manage products
- **Admin** - Platform administration (future feature)

## 🐛 Troubleshooting

### Common Issues

**Port already in use**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

**MongoDB connection error**
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`

**Module not found**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Bootstrap for the UI components
- Pexels for product images
- MongoDB for database solutions
- The open-source community

## 📞 Contact

- **Email**: info@agrismart.co.ke
- **Phone**: +254 700 000 000
- **Location**: Nairobi, Kenya

## 🗺️ Roadmap

- [ ] Payment gateway integration (M-Pesa, Card payments)
- [ ] SMS notifications
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Farmer verification system
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] AI-powered recommendations

---

**Made with ❤️ for Kenyan Farmers**

© 2024 AgriSmart. All rights reserved.
'@ | Out-File -FilePath "README.md" -Encoding utf8

Write-Host "`n✅ README.md created successfully!" -ForegroundColor Green
Write-Host "`nYou can now view it at: C:\Users\Administrator\Documents\Icysmart\README.md" -ForegroundColor Cyan
