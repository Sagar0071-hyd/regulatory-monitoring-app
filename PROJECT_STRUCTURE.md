# Project Structure & File Organization

Complete guide to understanding the project structure and all files included.

## Directory Tree

```
regulatory-monitoring-app/
│
├── README.md                          # Main project documentation
├── QUICKSTART.md                      # Quick start guide (5-10 minutes)
├── DEPLOYMENT.md                      # Production deployment guide
├── PROJECT_STRUCTURE.md               # This file
│
├── backend/                           # Backend API (Node.js/Express)
│   ├── models/                        # Database models
│   │   ├── User.js                    # User schema & methods
│   │   └── RegulatoryData.js          # Regulatory data schema
│   │
│   ├── routes/                        # API routes
│   │   ├── auth.js                    # Authentication endpoints
│   │   ├── admin.js                   # Admin panel endpoints
│   │   ├── payment.js                 # Razorpay payment endpoints
│   │   └── data.js                    # Regulatory data endpoints
│   │
│   ├── middleware/                    # Express middleware
│   │   └── auth.js                    # JWT authentication middleware
│   │
│   ├── utils/                         # Utility functions
│   │   ├── sendEmail.js               # Email sending utility
│   │   └── generatePassword.js        # Password generation utility
│   │
│   ├── server.js                      # Main server file
│   ├── package.json                   # Backend dependencies
│   ├── .env.example                   # Environment variables template
│   └── .env                           # Your configuration (create from .env.example)
│
└── frontend/                          # Frontend (React 18)
    ├── public/                        # Static files
    │   ├── index.html                 # HTML entry point
    │   └── favicon.ico                # Website icon
    │
    ├── src/                           # React components
    │   ├── pages/                     # Page components
    │   │   ├── Login.js               # Login page
    │   │   ├── Register.js            # Registration page
    │   │   ├── Dashboard.js           # Main dashboard with tabs
    │   │   ├── AdminPanel.js          # Admin management panel
    │   │   ├── UpgradePlan.js         # Payment/upgrade page
    │   │   ├── ForgotPassword.js      # Password reset request
    │   │   ├── ResetPassword.js       # Password reset form
    │   │   ├── Auth.css               # Authentication styles
    │   │   ├── Dashboard.css          # Dashboard styles
    │   │   ├── AdminPanel.css         # Admin panel styles
    │   │   └── UpgradePlan.css        # Upgrade plan styles
    │   │
    │   ├── components/                # Reusable components
    │   │   ├── Navigation.js          # Top navigation bar
    │   │   ├── Navigation.css         # Navigation styles
    │   │   └── ProtectedRoute.js      # Route protection wrapper
    │   │
    │   ├── App.js                     # Main app component
    │   ├── App.css                    # Global styles
    │   ├── index.js                   # React entry point
    │   └── index.css                  # Global CSS
    │
    ├── package.json                   # Frontend dependencies
    └── .env                           # Frontend configuration
```

## File Descriptions

### Backend Files

#### `server.js`
- **Purpose**: Main Express server entry point
- **Imports**: All routes and middleware
- **Starts**: Server on configured PORT
- **Configure**: PORT, FRONTEND_URL, MONGODB_URI

#### `models/User.js`
- **Purpose**: MongoDB user schema and authentication
- **Features**: 
  - Password hashing with bcryptjs
  - User role management (admin, user, paid_user)
  - Password reset tokens
  - Payment history tracking
- **Methods**: `matchPassword()`, `getSignedJwtToken()`

#### `models/RegulatoryData.js`
- **Purpose**: MongoDB regulatory data schema
- **Fields**: Title, description, severity, region, country, category
- **Categories**: 8 types of regulatory data

#### `routes/auth.js`
- **Endpoints**:
  - POST `/api/auth/register` - User registration
  - POST `/api/auth/login` - User login
  - POST `/api/auth/forgot-password` - Password reset request
  - POST `/api/auth/reset-password/:token` - Password reset
  - GET `/api/auth/me` - Get current user
- **Features**: JWT tokens, email verification, password reset

#### `routes/admin.js`
- **Endpoints**:
  - GET `/api/admin/users` - Get all users with stats
  - GET `/api/admin/users/:id` - Get specific user
  - PUT `/api/admin/users/:id/approve` - Approve user
  - PUT `/api/admin/users/:id/reject` - Reject user
  - GET `/api/admin/stats` - Dashboard statistics
- **Features**: Admin-only access, user management

#### `routes/payment.js`
- **Endpoints**:
  - POST `/api/payment/create-order` - Create Razorpay order
  - POST `/api/payment/verify-payment` - Verify payment
- **Features**: Razorpay integration, payment verification, user upgrade

#### `routes/data.js`
- **Endpoints**:
  - GET `/api/data/category/:category` - Get data by category
  - POST `/api/data/get-data` - Get filtered data
  - GET `/api/data/admin/all` - Admin get all data
- **Features**: Access control, category filtering

#### `middleware/auth.js`
- **Functions**:
  - `protect` - Verify JWT token
  - `authorize` - Check user role
- **Usage**: Applied to protected routes

#### `utils/sendEmail.js`
- **Purpose**: Send emails via Nodemailer
- **Usage**: Password reset emails, notifications
- **Configure**: Gmail or other SMTP provider

#### `utils/generatePassword.js`
- **Purpose**: Generate secure alphanumeric passwords
- **Usage**: Password reset tokens, admin passwords
- **Length**: 12 characters by default

#### `.env.example`
- **Purpose**: Template for environment variables
- **Copy to**: `.env` (create new file)
- **Update with**: Your actual credentials

### Frontend Files

#### `App.js`
- **Purpose**: Main React application component
- **Features**:
  - Route definitions
  - Authentication state management
  - Protected routes
- **Routes**: Login, Register, Dashboard, Admin, Upgrade

#### `pages/Login.js`
- **Purpose**: User login page
- **Features**: Email/password login, forgot password link
- **Demo Account**: Sagar0071@gmail.com / Login@321

#### `pages/Register.js`
- **Purpose**: New user registration
- **Features**: Create account, email validation
- **Note**: Account pending admin approval

#### `pages/Dashboard.js`
- **Purpose**: Main regulatory monitoring dashboard
- **Features**:
  - 8 tabs (4 free, 4 paid)
  - Tab switching
  - Data filtering
  - Upgrade prompts
- **Tabs**:
  - Free: Regulatory Updates, M&A Tracker, Deadline Countdown, Recalls
  - Paid: Competitors, RFI/RFP, Regulatory Services, Reg. Tools

#### `pages/AdminPanel.js`
- **Purpose**: Admin management interface
- **Tabs**:
  - User Management: Approve/reject users
  - Dashboard Stats: View metrics
  - Settings: Configure payment and GitHub
- **Features**: User approval, statistics, settings

#### `pages/UpgradePlan.js`
- **Purpose**: Payment and plan upgrade page
- **Plans**:
  - Monthly: ₹99 (30 days)
  - Quarterly: ₹249 (90 days)
  - Yearly: ₹899 (365 days)
- **Payment Methods**: UPI, Credit Card, Debit Card

#### `pages/ForgotPassword.js`
- **Purpose**: Password reset request
- **Features**: Email input, reset link sent notification

#### `pages/ResetPassword.js`
- **Purpose**: Password reset form
- **Features**: New password input, confirmation

#### `components/Navigation.js`
- **Purpose**: Top navigation bar
- **Features**: Links, logout button, user role display

#### `components/ProtectedRoute.js`
- **Purpose**: Route protection wrapper
- **Features**: Redirect unauthorized users

#### `index.js`
- **Purpose**: React DOM render entry point
- **Usage**: No modification needed

#### `App.js` & `App.css`
- **Purpose**: Global app styles and layout

#### `pages/Auth.css`
- **Purpose**: Authentication pages styling
- **Classes**: auth-container, auth-card, form-group, btn

#### `pages/Dashboard.css`
- **Purpose**: Dashboard page styling
- **Features**: Tab styling, table styling, responsive layout

#### `pages/AdminPanel.css`
- **Purpose**: Admin panel styling
- **Features**: Table styles, stat cards, settings forms

#### `pages/UpgradePlan.css`
- **Purpose**: Upgrade/pricing page styling
- **Features**: Plan cards, payment methods, FAQ section

## How to Modify Files

### Add a New Tab to Dashboard

1. **Edit `frontend/src/pages/Dashboard.js`**:
```javascript
const tabs = [
  // ... existing tabs
  { id: 'new-tab', label: 'New Tab', icon: '📌', restricted: false },
];
```

2. **Add handler in `backend/routes/data.js`**:
```javascript
router.get('/category/new-tab', protect, async (req, res) => {
  // Fetch and return new tab data
});
```

### Change Pricing Plans

**Edit `frontend/src/pages/UpgradePlan.js`**:
```javascript
const plans = [
  {
    id: 1,
    name: 'Monthly',
    duration: 30,
    price: 99,  // Change this
    // ... rest of plan
  },
];
```

### Customize Email Templates

**Edit `backend/routes/auth.js`** (in forgot-password endpoint):
```javascript
const message = `
  <h2>Your Custom Subject</h2>
  <p>Your custom HTML email content here</p>
`;
```

### Add New Admin Features

1. **Add route in `backend/routes/admin.js`**
2. **Add UI in `frontend/src/pages/AdminPanel.js`**
3. **Update CSS in `frontend/src/pages/AdminPanel.css`**

### Change Default Admin Credentials

**Edit `.env`**:
```env
ADMIN_EMAIL=new-admin-email@example.com
ADMIN_PASSWORD=NewPassword@123
```

### Customize Colors and Branding

**Edit CSS files**:
- `App.css` - Global colors
- `pages/*.css` - Page-specific colors
- `components/Navigation.css` - Header colors

Primary color: `#667eea` (appears throughout)
Secondary color: `#764ba2`

## File Dependencies

```
server.js
├── mongoose (database)
├── express (framework)
├── cors (cross-origin)
├── routes/
│   ├── auth.js
│   │   └── utils/sendEmail.js
│   ├── admin.js
│   ├── payment.js
│   └── data.js
└── middleware/auth.js

App.js
├── React Router
├── Axios (HTTP)
├── React Toastify (notifications)
└── pages/
    ├── Login.js
    ├── Register.js
    ├── Dashboard.js
    ├── AdminPanel.js
    ├── UpgradePlan.js
    └── components/
        ├── Navigation.js
        └── ProtectedRoute.js
```

## Configuration Files

### `backend/.env.example` → `backend/.env`
Contains all backend configuration:
- Server port
- Database connection
- Authentication secrets
- Email settings
- Payment gateway keys
- Admin credentials

### `frontend/` (no .env by default)
If needed, create `.env` for:
```env
REACT_APP_API_URL=http://localhost:5000
```

## Package Dependencies

### Backend (`backend/package.json`)
- **express**: Web framework
- **mongoose**: MongoDB ORM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: Authentication tokens
- **nodemailer**: Email sending
- **razorpay**: Payment processing
- **cors**: Cross-origin requests
- **dotenv**: Environment variables

### Frontend (`frontend/package.json`)
- **react**: UI library
- **react-router-dom**: Routing
- **axios**: HTTP client
- **react-toastify**: Notifications
- **razorpay**: Payment SDK

## How to Add New Dependencies

### Backend
```bash
cd backend
npm install package-name
```

### Frontend
```bash
cd frontend
npm install package-name
```

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (user|admin|paid_user),
  isPaid: Boolean,
  paidTill: Date,
  status: String (pending|approved|rejected),
  paymentHistory: Array,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: Date
}
```

### RegulatoryData Collection
```javascript
{
  _id: ObjectId,
  category: String,
  title: String,
  description: String,
  severity: String,
  region: String,
  country: String,
  productCategory: String,
  source: String,
  deadline: Date,
  url: String,
  contact: Object,
  createdAt: Date,
  updatedAt: Date
}
```

---

**Now you understand the complete project structure!** 🎉
