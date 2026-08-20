# Get Me Chai ☕💙

**Get Me Chai** is a crowdfunding platform where users can create an account, support creators, and contribute financially to their campaigns.

The project integrates **Razorpay** to provide a secure and convenient online payment experience.

## ✨ Features

* 🔐 User registration & authentication
* 👤 User profiles
* 💰 Crowdfunding & financial contributions
* 💳 Razorpay payment gateway integration
* 📊 Campaign/support tracking
* 🗄️ MongoDB database integration
* 🔒 Secure password handling
* 📱 Responsive user interface

## 🛠️ Tech Stack

* **Next.js 16 & React 19** – Full-stack web application
* **MongoDB + Mongoose** – Database and data management
* **NextAuth.js** – Authentication & sessions
* **Razorpay** – Payment gateway
* **bcryptjs** – Password hashing
* **Tailwind CSS** – Styling
* **Shadcn UI / Radix UI** – UI components
* **Lucide React** – Icons

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/dipakbera07/get-me-chai.git
cd get-me-chai
npm install
```

### 2. Environment Variables

Create a `.env.local` file and add your required credentials:

```env
MONGODB_URI=Enter your mongodb URI
NEXTAUTH_SECRET=Enter your NextAuth Secret

NEXT_PUBLIC_KEY_ID=Enter your Razorpay Public key
KEY_ID=Enter your Razorpay Public key
KEY_SECRET=Enter your Razorpay Private key

NEXTAUTH_URL=Enter your localhost url
```

### 3. Run the Project

```bash
npm run dev
```

Open **http://localhost:3000** in your browser.

> ⚠️ Never commit `.env.local` or payment/API credentials to GitHub.

## 🎯 Purpose

Built as a full-stack project to practice **authentication, database management, crowdfunding workflows, and payment gateway integration using Razorpay**.

**Developed by Dipak Bera**
