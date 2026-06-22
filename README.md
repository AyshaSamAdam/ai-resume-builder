# AI Interview Preparation Assistant

A full-stack AI-powered web application 
that helps job seekers prepare for 
interviews by analyzing their resume, 
self description, and job description 
using Google Gemini AI.

https://ai-resume-builder-nu-silk.vercel.app/

## ✨ Features
- 🔐 Secure authentication (JWT + Redis)
- 📄 PDF resume upload and parsing
- 🤖 AI-powered interview report generation
- ❓ Technical & behavioral questions
- 📊 Skills gap analysis with severity levels
- 📅 Personalized day-wise preparation plan
- 📈 Job match score (0-100)
- 📋 Report history dashboard

## 🛠️ Tech Stack

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- Redis (session management)
- JWT Authentication
- Google Gemini AI API
- Multer (file uploads)
- pdf-parse (PDF text extraction)
- Zod (structured AI output)
- Helmet (security headers)
- bcrypt (password hashing)

### Frontend
- React.js
- React Router DOM
- Axios (with interceptors)
- Tailwind CSS
- Context API (global state)

## 🔒 Security Features
- JWT access tokens (15min expiry)
- Refresh tokens stored in Redis
- httpOnly cookies
- Rate limiting
- MongoDB injection protection
- Helmet security headers
- Input sanitization & validation
- Report ownership verification

## 🏃 Running Locally

### Prerequisites
- Node.js
- MongoDB Atlas account
- Redis account (Upstash)
- Google Gemini API key

### Backend Setup
```bash
cd Backened
npm install
