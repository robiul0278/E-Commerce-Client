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
- **Seller**:
  - Add new products, update listings, and manage inventory via the seller dashboard.
- **Admin**:
  - Oversee user accounts, manage roles, and ensure smooth platform operations through an admin dashboard.

### Authentication
- Role-specific authentication ensures users only access features available to their roles.

### Dashboard Features
- Buyers, sellers, and admins each have tailored dashboards to interact with the platform efficiently.

---

## User Authentication Credentials

### Admin
- **Email**: `mobileshop10@gmail.com`
- **Password**: `Mobile123@`

### Seller
- **Email**: `mobileshop20@gmail.com`
- **Password**: `Mobile123@`

### Buyer
- **Email**: `mobileshop40@gmail.com`
- **Password**: `Mobile123@`

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
   git clone <https://github.com/robiul0278/Mobile-Shop-Client>
   git clone <https://github.com/robiul0278/Mobile-Shop-Server>
   ```

2. **Install dependencies**:
   For the client:
   ```bash
   cd client
   npm install
   ```
   For the server:
   ```bash
   cd server
   npm install
   ```

3. **Environment Variables**:
   - Create a `.env` file in the server directory.
   - Add the following environment variables:
     ```env
     PORT=5000
     MONGO_URI=<your-mongo-db-uri>
     STRIPE_SECRET_KEY=<your-stripe-secret-key>
     FIREBASE_API_KEY=<your-firebase-api-key>
     FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
     FIREBASE_PROJECT_ID=<your-firebase-project-id>
     FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
     FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
     FIREBASE_APP_ID=<your-firebase-app-id>
     ```

4. **Start the server**:
   ```bash
   cd server
   npm start
   ```

5. **Start the client**:
   ```bash
   cd client
   npm start
   ```

6. **Access the application**:
   - Open your browser and navigate to `http://localhost:5173/`.

---

## How to Use the Website

1. **Access Role-Specific Features**:
   - Log in with the provided credentials to explore buyer, seller, and admin functionalities.

2. **Buyer Features**:
   - Browse available products.
   - Add items to your cart and proceed to checkout.

3. **Seller Features**:
   - Add new product listings.
   - Update or delete existing products.

4. **Admin Features**:
   - Manage user accounts (view, update, or delete users).
   - Oversee the website's operations.

---

## Contributions

Feel free to contribute to this project by creating pull requests or raising issues in the respective GitHub repositories.

---

## License
This project is licensed under the MIT License. For more details, refer to the LICENSE file in the repositories.
