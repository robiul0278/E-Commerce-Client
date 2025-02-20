# Mobile Shop (An Online Gadget Website)

## Live Link
[https://mymobile-shop.netlify.app/](#)

## GitHub Repositories
- **Client Repository**: [https://github.com/robiul0278/Mobile-Shop-Client](#)
- **Server Repository**: [https://github.com/robiul0278/Mobile-Shop-Server](#)

---

## Features

### Role-Based Access
- **Buyer**:
  - Browse products and make purchases through a dedicated dashboard.
- **Admin**:
  - Oversee user accounts, manage roles, and ensure smooth platform operations through an admin dashboard.
  - **Flash Sale Logic**:
    - Admins can set up flash sales with a countdown timer.
    - Configure sale duration and products on sale.

### Authentication
- Role-specific authentication ensures users only access features available to their roles.

### Dashboard Features
- Buyers and admins each have tailored dashboards to interact with the platform efficiently.

---

## User Authentication Credentials

### Admin
- **Email**: `admin@gmail.com`
- **Password**: `Admin123!`

### Buyer
- **Email**: `user@.com`
- **Password**: `User123!`

---

## Technology Stack

### Frontend
- **React**: For building user interfaces.
- **Tailwind CSS**: For responsive and modern styling.
- **DaisyUI**: For pre-styled components and improved design workflow.
- **Axios**: For making API requests.
- **React Hook Form**: For form validation and state management.

### Backend
- **Express.js**: Backend framework for handling server logic.
- **MongoDB**: Database for storing user, product, and transaction data.

### Authentication
- **Firebase**: For user authentication and role management.

---

## Installation and Setup

### Prerequisites
- Ensure you have **Node.js** and **npm** installed on your system.
- Install MongoDB and set up a database.

### Steps

1. **Clone the repositories**:
   ```bash
   git clone https://github.com/robiul0278/Mobile-Shop-Client
   git clone https://github.com/robiul0278/Mobile-Shop-Server


cd client
npm install

cd server
npm install


PORT=5000
MONGO_URI=<your-mongo-db-uri>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
FIREBASE_API_KEY=<your-firebase-api-key>
FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
FIREBASE_PROJECT_ID=<your-firebase-project-id>
FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
FIREBASE_APP_ID=<your-firebase-app-id>

cd server
npm start

cd client
npm start
