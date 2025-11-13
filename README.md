# AI Engineer / UI-UX Designer / Data Analyst Portfolio

A modern, full-stack portfolio website showcasing projects and skills in AI Engineering, UI/UX Design, and Data Analysis.

## 🚀 Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Axios** for API calls
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **Nodemailer** for email notifications
- **Express Rate Limit** for API protection
- **Helmet** for security headers
- **JWT** for authentication

## 📋 Features

- ✨ Modern, responsive design with smooth animations
- 🎨 Glassmorphic UI components
- 📧 Contact form with email notifications
- 📊 Project showcase with filtering
- 📈 Analytics tracking
- 🔒 Rate limiting and security headers
- 🌙 Optimized for performance

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Gmail account (for email service)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd portfolio
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file
cp .env.example .env
# Edit .env with your credentials
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Configure Environment Variables

**Backend (.env):**
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_TO=your-email@gmail.com
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=http://localhost:3000
```

**Gmail App Password:**
1. Enable 2-Factor Authentication in Gmail
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Use this password in EMAIL_PASS

### 5. Seed Database (Optional)
```bash
cd backend
node src/seeds/seedProjects.js
```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:3000

### Production Build

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 📁 Project Structure

```
portfolio/
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # API utilities
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # Express routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── config/         # Configuration files
│   │   ├── utils/          # Utility functions
│   │   ├── seeds/          # Database seeders
│   │   ├── app.js
│   │   └── server.js
│   ├── .env
│   └── package.json
│
├── .gitignore
└── README.md
```

## 🔧 API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project (protected)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (protected)

### Analytics
- `POST /api/analytics/visit` - Track page visit
- `POST /api/analytics/event` - Track custom event
- `GET /api/analytics` - Get analytics data (protected)

### Health Check
- `GET /api/health` - Server health status

## 🎨 Customization

### Update Personal Information
1. Edit `frontend/src/components/Hero.jsx` - Update name and bio
2. Edit `frontend/src/components/Skills.jsx` - Update skills and expertise
3. Edit `frontend/src/components/Contact.jsx` - Update contact information

### Add Projects
Use the seed script or add via API:
```bash
node backend/src/seeds/seedProjects.js
```

### Styling
- Modify `frontend/tailwind.config.js` for theme colors
- Update `frontend/src/index.css` for global styles

## 🔒 Security Features

- Helmet.js security headers
- CORS configuration
- Rate limiting on API endpoints
- Input validation and sanitization
- MongoDB injection prevention
- XSS protection

## 📈 Performance Optimizations

- Code splitting with React lazy loading
- Image optimization
- Minified production builds
- Gzip compression
- Efficient database queries with indexes

## 🐛 Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running locally or Atlas URL is correct
- Check firewall settings for MongoDB Atlas

### Email Not Sending
- Verify Gmail App Password is correct
- Check EMAIL_USER and EMAIL_PASS in .env
- Ensure 2FA is enabled on Gmail account

### CORS Errors
- Verify FRONTEND_URL matches your frontend URL
- Check backend CORS configuration in app.js

## 📝 License

MIT License - feel free to use this project for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

Your Name - your.email@example.com

Portfolio Link: [https://yourportfolio.com](https://yourportfolio.com)
