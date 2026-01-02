# Contact Management Application

A full-stack contact management application built with React and Node.js, featuring a clean UI, real-time contact management, and MongoDB database integration.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Usage](#usage)
- [Requirements Checklist](#requirements-checklist)

## ✨ Features

### Core Features

- ✅ **Contact Form** with client-side validation
  - Name (required)
  - Email (required, validated)
  - Phone (required)
  - Message (optional, max 100 characters)
- ✅ **Backend API** for CRUD operations
  - POST: Create new contacts
  - GET: Fetch all contacts
  - DELETE: Remove contacts
- ✅ **MongoDB Database** for persistent storage
- ✅ **Real-time Display** of contacts without page reload
- ✅ **Responsive UI** with clean, modern design
- ✅ **Form Validation** with disabled submit button when invalid

### Bonus Features

- ✅ **Delete Contact** functionality
- ✅ **Success Messages** after form submission
- ✅ **Reusable Components** (ContactForm, ContactsList)
- ✅ **Basic Sorting** (contacts sorted by creation date, newest first)
- ✅ **Loading States** during form submission
- ✅ **Error Handling** with user-friendly messages

## 🛠 Tech Stack

### Frontend

- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **Tailwind CSS 4.1.18** - Styling framework
- **Axios 1.13.2** - HTTP client

### Backend

- **Node.js** - Runtime environment
- **Express 5.2.1** - Web framework
- **MongoDB** - Database
- **Mongoose 9.1.1** - ODM for MongoDB
- **CORS 2.8.5** - Cross-origin resource sharing
- **dotenv 17.2.3** - Environment variable management

## 📁 Project Structure

```
contact_management_app/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactForm.jsx    # Contact form component
│   │   │   └── ContactsList.jsx   # Contacts display component
│   │   ├── pages/
│   │   │   └── ContactPage.jsx    # Main page component
│   │   ├── App.jsx                # Root component
│   │   ├── main.jsx               # Entry point
│   │   └── index.css              # Global styles
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Backend Node.js application
│   ├── config/
│   │   └── dbConfig.js            # MongoDB connection
│   ├── controllers/
│   │   └── contact.controller.js  # Contact business logic
│   ├── models/
│   │   └── contact.model.js       # Contact schema
│   ├── routes/
│   │   └── contact.routes.js      # API routes
│   ├── app.js                      # Express app configuration
│   ├── index.js                    # Server entry point
│   └── package.json
│
└── README.md
```

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd contact_management_app
```

### Step 2: Install Backend Dependencies

```bash
cd server
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd ../client
npm install
```

### Step 4: Set Up Environment Variables

Create a `.env` file in the `server` directory:

```env
PORT=
MONGO_URL=
CORS_ORIGIN=
```

Create a `.env` file in the `client` directory:

```env
VITE_BACKEND_BASEURL=
```

### Step 5: Start MongoDB

Make sure MongoDB is running on your system:

```bash
# If using local MongoDB
mongod
```

Or use MongoDB Atlas (cloud) and update the `MONGO_URL` in your `.env` file.

### Step 6: Start the Application

**Terminal 1 - Start Backend Server:**

```bash
cd server
npm run dev
```

Server will run on `http://localhost:3000`

**Terminal 2 - Start Frontend Development Server:**

```bash
cd client
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔧 Environment Variables

### Server (.env)

| Variable      | Description                            | Default               |
| ------------- | -------------------------------------- | --------------------- |
| `PORT`        | Server port number                     | 3000                  |
| `MONGO_URL`   | MongoDB connection string              | Required              |
| `CORS_ORIGIN` | Allowed CORS origins (comma-separated) | http://localhost:5173 |

### Client (.env)

| Variable               | Description          | Default                   |
| ---------------------- | -------------------- | ------------------------- |
| `VITE_BACKEND_BASEURL` | Backend API base URL | http://localhost:3000/api |

## 📡 API Endpoints

### Base URL

```
http://localhost:3000/api
```

### Endpoints

#### 1. Create Contact

- **POST** `/create-contact`
- **Body:**
  ```json
  {
    "name": "one",
    "email": "one@example.com",
    "phone": "+1234567890",
    "message": "Optional message"
  }
  ```
- **Response:** `201 Created`
  ```json
  {
    "_id": "...",
    "name": "one",
    "email": "one@example.com",
    "phone": "+1234567890",
    "message": "Optional message",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
  ```

#### 2. Get All Contacts

- **GET** `/get-contacts`
- **Response:** `200 OK`
  ```json
  [
    {
      "_id": "...",
      "name": "one",
      "email": "one@example.com",
      "phone": "+1234567890",
      "message": "Optional message",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
  ```

#### 3. Delete Contact

- **DELETE** `/delete-contact/:id`
- **Response:** `200 OK`
  ```json
  {
    "success": true,
    "message": "Contact deleted successfully",
    "data": { ... }
  }
  ```

## 🗄 Database Schema

### Contact Model

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  message: {
    type: String,
    optional: true
  },
  createdAt: Date,  // Auto-generated
  updatedAt: Date    // Auto-generated
}
```

## 💻 Usage

### Adding a Contact

1. Fill in the contact form with:
   - **Name** (required)
   - **Email** (required, must be valid email format)
   - **Phone** (required)
   - **Message** (optional, max 100 characters)
2. Click "Add Contact" button
3. Success message will appear
4. Contact will automatically appear in the contacts list

### Viewing Contacts

- All contacts are displayed in a table format
- Contacts are sorted by creation date (newest first)
- Shows name, email, phone, and message

### Deleting a Contact

1. Click the "Delete" button next to any contact
2. Contact will be removed from the list immediately

### Form Validation

- Submit button is disabled when form is invalid
- Real-time validation feedback
- Error messages displayed below invalid fields
- Email format validation
- Message character limit (100 characters)

## ✅ Requirements Checklist

### Core Requirements

- [x] **Contact Form**

  - [x] Name field (required)
  - [x] Email field (validated)
  - [x] Phone field (required)
  - [x] Message field (optional)
  - [x] Client-side validation with error messages

- [x] **Backend API**

  - [x] POST API to store contact data
  - [x] GET API to fetch stored contacts

- [x] **Database**

  - [x] MongoDB integration
  - [x] Contact schema design

- [x] **Display Contacts**

  - [x] Show submitted contacts in list/table
  - [x] No page reload required

- [x] **UI & UX**
  - [x] Responsive layout
  - [x] Clean design
  - [x] Submit button disabled if invalid

### Bonus Features

- [x] Delete contact functionality
- [x] Success message display
- [x] Reusable components
- [x] Basic sorting (by creation date)

## 🎨 UI Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern Styling**: Clean, professional interface using Tailwind CSS
- **User Feedback**: Success and error messages for all operations
- **Loading States**: Visual feedback during form submission
- **Form Validation**: Real-time validation with helpful error messages
- **Accessibility**: Proper labels and ARIA attributes

## 🔍 Development

### Running in Development Mode

- Backend: `npm run dev` (uses nodemon for auto-restart)
- Frontend: `npm run dev` (uses Vite HMR)

### Building for Production

```bash
cd client
npm run build
```

## 📝 Notes

- The application uses ES6 modules (`type: "module"` in package.json)
- MongoDB connection is established on server startup
- CORS is configured to allow requests from the frontend
- All timestamps are automatically managed by Mongoose

## 👤 Author

Shashank

