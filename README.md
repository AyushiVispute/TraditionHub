# 🏛️ TraditionHub

> **Discover Culture. Plan Experiences. Connect Locally. Travel Mindfully.**

TraditionHub is an AI-powered cultural tourism platform designed to help travelers discover cultural destinations, understand local traditions, plan personalized trips, connect with local guides, and explore places through an intelligent AI guide.

The platform combines **cultural discovery, personalized recommendations, AI assistance, trip planning, local guide booking, and route optimization** into one integrated travel experience.

---

## 🌍 Overview

Traditional travel platforms mainly focus on destinations, hotels, and transportation. TraditionHub focuses on the **cultural experience behind the destination**.

Users can:

* 🏛️ Explore cultural and historical places
* 🎯 Select their Topics of Interest (TOIs)
* 🤖 Interact with an AI cultural guide
* 🗺️ Generate personalized trip plans
* 📍 Receive POI recommendations based on interests
* 👤 Discover and book local guides
* ❤️ Save/bookmark places
* 🧭 Optimize travel routes and itineraries
* 📚 Learn about traditions, festivals, history, and local culture

### Core Concept

```text
Learn Culture
      ↓
Discover Places
      ↓
Select Interests
      ↓
Get Personalized Recommendations
      ↓
Plan Your Trip
      ↓
Connect With Local Guides
      ↓
Experience Culture
```

---

# ✨ Key Features

## 🏛️ Cultural Place Discovery

Explore culturally significant destinations with detailed information including:

* Place descriptions
* Historical information
* Cultural significance
* Images
* Location information
* Recommended activities
* Nearby experiences

---

## 🤖 AI Cultural Guide

TraditionHub includes an AI-powered guide that helps users understand cultural destinations.

Users can ask questions such as:

* Temple history
* Best time for Darshan
* Dress code
* Nearby food
* Festival information
* Hidden cultural stories

The AI guide provides conversational responses based on the selected destination and cultural context.

### AI Guide Flow

```text
User Question
      ↓
Frontend AI Chat
      ↓
Backend Guide API
      ↓
AI Service
      ↓
Generative AI
      ↓
Cultural Response
```

---

## 🎯 Personalized Preferences

Users can select their **Topics of Interest (TOIs)** to personalize their travel experience.

Examples include:

* Heritage
* Spirituality
* Festivals
* Architecture
* Food
* Art
* History
* Local traditions

The selected preferences are used by the recommendation system to identify relevant Places of Interest (POIs).

---

## 🧠 POI–TOI Recommendation System

TraditionHub uses a POI–TOI matching approach to connect user interests with suitable destinations.

### Recommendation Flow

```text
User Preferences
      ↓
Topics of Interest
      ↓
POI–TOI Scoring
      ↓
Profile Matching
      ↓
Recommended Places
      ↓
Personalized Trip
```

The backend includes services such as:

* `poiToiScorer.js`
* `userProfileMatchmaker.js`
* `recommendationController.js`

This architecture allows the recommendation system to be extended with more advanced ranking and AI-based techniques.

---

# 🗺️ Intelligent Trip Planner

TraditionHub includes an interactive trip planner that helps users create itineraries based on:

* Destination
* Available time
* User interests
* Selected places
* Travel constraints

The planner provides an itinerary containing recommended places and estimated travel order.

### Planner Architecture

```text
User Preferences
       ↓
Planner API
       ↓
Planner Controller
       ↓
Optimizer Service
       ↓
Route / Itinerary Optimization
       ↓
Optimized Trip
       ↓
Planner Result UI
```

The frontend includes:

* `Planner.jsx`
* `PlannerModal.jsx`
* `PlannerDrawer.jsx`
* `PlannerResult.jsx`

---

# 🚗 Route Optimization Microservice

TraditionHub includes a separate Python-based optimizer service.

### Technology

* Python
* FastAPI
* OR-Tools
* Custom distance calculations
* Route optimization

The service is responsible for calculating an efficient visiting order for selected places.

### Optimizer Structure

```text
optimizer-service/
│
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── distance.py
│   └── solver.py
│
├── requirements.txt
└── Dockerfile
```

The optimizer is separated from the main backend so that route-planning logic can be independently developed and scaled.

---

# 👥 Local Guide Platform

TraditionHub allows travelers to discover and connect with local guides.

Features include:

* Guide profiles
* Guide details
* Guide discovery
* Guide booking
* Booking requests
* User bookings
* Guide booking management
* Admin guide management

### Guide Flow

```text
Traveler
   ↓
Browse Guides
   ↓
View Guide Profile
   ↓
Send Booking Request
   ↓
Guide Responds
   ↓
Booking Management
```

---

# 👨‍💼 Admin Dashboard

An admin dashboard is included for managing platform content.

Admin functionality includes:

* Add places
* Edit places
* Delete places
* Manage guides
* Manage Topics of Interest
* Manage recommendations
* Manage cultural content

---

# 🔐 Authentication & Authorization

The backend contains authentication and authorization functionality for different user roles.

The system supports protected functionality through middleware and route-level authorization.

Example architecture:

```text
Request
  ↓
Authentication Middleware
  ↓
Authorization
  ↓
Controller
  ↓
Database
```

---

# ❤️ Bookmarks & Trips

Users can save places and manage their travel plans.

The backend includes models and controllers for:

* Users
* Places
* Trips
* Bookmarks
* Guides
* Guide Bookings
* Topics of Interest

---

# 🏗️ Project Architecture

```text
TraditionHub
│
├── Backend/
│   │
│   ├── controllers/
│   │   ├── guideController.js
│   │   ├── guideBookingController.js
│   │   ├── plannerController.js
│   │   ├── preferencesController.js
│   │   ├── recommendationController.js
│   │   ├── toiController.js
│   │   ├── tripController.js
│   │   └── placeController.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Place.js
│   │   ├── Guide.js
│   │   ├── GuideBooking.js
│   │   ├── Toi.js
│   │   └── Trip.js
│   │
│   ├── routes/
│   │   ├── aiGuideRoutes.js
│   │   ├── guideRoutes.js
│   │   ├── plannerRoutes.js
│   │   ├── preferencesRoutes.js
│   │   ├── toiRoutes.js
│   │   ├── tripRoutes.js
│   │   └── placeRoutes.js
│   │
│   ├── services/
│   │   ├── aiservice.js
│   │   ├── plannerClient.js
│   │   ├── poiToiScorer.js
│   │   └── userProfileMatchmaker.js
│   │
│   └── server.js
│
├── Frontend/
│   │
│   ├── components/
│   │   ├── admin/
│   │   ├── common/
│   │   ├── guide/
│   │   ├── place/
│   │   └── preferences/
│   │
│   ├── pages/
│   │   ├── admin/
│   │   ├── guide/
│   │   ├── planner/
│   │   ├── preferences/
│   │   ├── Explore.jsx
│   │   ├── Home.jsx
│   │   └── PlaceDetail.jsx
│   │
│   ├── services/
│   │   ├── guideApi.js
│   │   ├── plannerApi.js
│   │   └── toiApi.js
│   │
│   └── App.jsx
│
├── optimizer-service/
│   ├── app/
│   │   ├── main.py
│   │   ├── distance.py
│   │   └── solver.py
│   ├── requirements.txt
│   └── Dockerfile
│
└── README.md
```

---

# 🛠️ Technology Stack

## Frontend

| Technology      | Purpose             |
| --------------- | ------------------- |
| React           | UI development      |
| Vite            | Frontend tooling    |
| React Router    | Client-side routing |
| Tailwind CSS    | Styling             |
| Axios           | API communication   |
| Framer Motion   | Animations          |
| Lucide React    | Icons               |
| React Hot Toast | Notifications       |

## Backend

| Technology | Purpose           |
| ---------- | ----------------- |
| Node.js    | Runtime           |
| Express.js | REST API          |
| MongoDB    | Database          |
| Mongoose   | Database modeling |
| JWT        | Authentication    |
| Cloudinary | Image management  |
| Multer     | File uploads      |

## AI & Recommendation

| Technology            | Purpose                        |
| --------------------- | ------------------------------ |
| Generative AI         | AI cultural guide              |
| POI–TOI Scoring       | Interest-based recommendations |
| User Profile Matching | Personalized discovery         |

## Optimization

| Technology            | Purpose                     |
| --------------------- | --------------------------- |
| Python                | Optimization service        |
| FastAPI               | Optimizer API               |
| OR-Tools              | Route optimization          |
| Custom distance logic | Travel distance calculation |

---

# 🚀 Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/TraditionHub.git
cd TraditionHub
```

---

# ⚙️ Backend Setup

Navigate to the backend:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_API_KEY=your_google_ai_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
OPTIMIZER_URL=http://localhost:8000
```

Start the backend:

```bash
npm run dev
```

or:

```bash
node server.js
```

Backend will run on:

```text
http://localhost:5000
```

---

# 🎨 Frontend Setup

Open another terminal:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Create your environment configuration if required:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

# 🧭 Optimizer Service Setup

Navigate to:

```bash
cd optimizer-service
```

Create a virtual environment:

### Windows

```powershell
python -m venv venv
venv\Scripts\activate
```

### macOS/Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start FastAPI:

```bash
uvicorn app.main:app --reload --port 8000
```

Optimizer API:

```text
http://localhost:8000
```

Swagger documentation:

```text
http://localhost:8000/docs
```

---

# 🔑 Environment Variables

**Never commit secrets to GitHub.**

The following files should remain private:

```text
.env
```

Use an example file instead:

```text
.env.example
```

Example:

```env
MONGO_URI=
JWT_SECRET=
GOOGLE_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
OPTIMIZER_URL=
```

---

# 🔄 System Workflow

The overall TraditionHub architecture can be represented as:

```text
                    ┌─────────────────────┐
                    │      Traveler       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │       + Vite        │
                    └──────────┬──────────┘
                               │
                    REST API / Axios
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Node + Express    │
                    │      Backend        │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
         ┌─────────┐     ┌──────────┐    ┌──────────┐
         │ MongoDB │     │ AI Guide │    │   Auth   │
         └─────────┘     └──────────┘    └──────────┘
                               │
                               ▼
                     ┌──────────────────┐
                     │ Recommendation   │
                     │  POI–TOI Engine  │
                     └────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │  Trip Planner    │
                     └────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │ Python Optimizer │
                     │ FastAPI + ORTools│
                     └──────────────────┘
```

---

# 📱 Main User Journey

```text
Home
 │
 ├── Explore Cultural Places
 │       │
 │       └── Place Details
 │              │
 │              ├── AI Cultural Guide
 │              ├── Nearby Information
 │              └── Plan Trip
 │
 ├── Set Preferences
 │       │
 │       └── Topics of Interest
 │
 ├── Personalized Recommendations
 │
 ├── Trip Planner
 │       │
 │       └── Optimized Itinerary
 │
 └── Local Guides
         │
         └── Guide Booking
```

---

# 🎯 Project Goals

TraditionHub aims to make cultural tourism more:

* **Personalized** — recommendations based on user interests
* **Interactive** — AI-powered cultural conversations
* **Accessible** — cultural information in one platform
* **Experiential** — connects travelers with local guides
* **Efficient** — optimized travel planning
* **Meaningful** — encourages deeper cultural understanding

---

# 🔮 Future Enhancements

Potential future improvements include:

* 🗺️ Interactive maps and live navigation
* 🚕 Cab/transportation integration
* 🌐 Multi-language AI guide
* 🎙️ Voice-based cultural assistant
* 📍 Real-time location-aware recommendations
* 🧠 Advanced semantic POI–TOI matching
* 📊 Recommendation analytics
* 💳 Online guide booking/payment
* ⭐ Reviews and ratings
* 📱 Progressive Web App / mobile application
* ☁️ Production cloud deployment
* 🔔 Notifications for bookings and trips

---

