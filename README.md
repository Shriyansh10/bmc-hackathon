# 🎟️ Booking Seva

A simple backend system for managing seat bookings with authentication and protected APIs.

This project is built as a practical learning exercise to understand how real-world backend systems work — especially authentication, database design, and booking flows — without unnecessary complexity.

---

## 🚀 What this project does

Booking Seva is a minimal ticket booking backend where:

* Users can register and log in
* Authentication is handled using JWT (access + refresh tokens)
* Seats can be viewed along with their booking status
* Logged-in users can book seats
* Each seat can only be booked once

---

## 🧠 Why this project exists

Instead of just building features blindly, this project focuses on:

* Understanding an existing codebase and improving it
* Implementing authentication properly (not just copying logic)
* Structuring backend code cleanly (controllers, services, models)
* Learning how booking systems actually prevent conflicts

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **PostgreSQL**
* **JWT (Authentication)**
* **Bcrypt (Password hashing)**

---

## 📁 Project Structure

```
backend/
│
└── src/
    │
    ├── common/                  # Shared logic across modules
    │   ├── config/              # DB & external configs
    │   │   ├── db.js
    │   │   └── email.js
    │   │
    │   ├── dto/                 # Base DTOs
    │   │   └── base.dto.js
    │   │
    │   ├── middlewares/         # Global middlewares
    │   │   └── validate.middlewares.js
    │   │
    │   └── utils/               # Utilities
    │       ├── api-error.js
    │       ├── api-response.js
    │       └── jwt.utils.js
    │
    ├── modules/                 # Feature-based modules
    │
    │   ├── auth/                # Authentication module
    │   │   ├── dto/
    │   │   │   ├── login.dto.js
    │   │   │   └── register.dto.js
    │   │   │
    │   │   ├── user.controller.js
    │   │   ├── user.middleware.js
    │   │   ├── user.model.js
    │   │   ├── user.routes.js
    │   │   └── user.service.js
    │   │
    │   └── booking/             # Booking module
    │       ├── booking.controller.js
    │       ├── booking.middlewares.js
    │       ├── booking.model.js
    │       ├── booking.routes.js
    │       └── booking.service.js
    │
    └── app.js                   # Entry point
```

---

## 🔐 Authentication Flow

* User logs in → receives:

  * Access Token (short-lived)
  * Refresh Token (stored in HTTP-only cookie)

* Access token:

  * Used for protected routes

* Refresh token:

  * Used to generate new access tokens

---

## 📌 API Endpoints

### Auth Routes

* `POST /register` → Register a new user
* `POST /login` → Login user
* `GET /profile` → Get current user (protected)
* `POST /logout` → Logout user
* `GET /refresh-token` → Refresh access token

---

### Booking Routes

* `GET /seats`
  → Returns all seats with availability

* `POST /:id/:name`
  → Book a seat (protected)

---

## 🧱 Database Schema

```sql
CREATE TABLE IF NOT EXISTS users(
   id SERIAL PRIMARY KEY,
   name VARCHAR(60) NOT NULL,
   email VARCHAR(80) UNIQUE NOT NULL,
   password VARCHAR(200) NOT NULL,
   refresh_token VARCHAR(100) NOT NULL,
   refresh_token_expires_in VARCHAR(10) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS seats(
   id SERIAL PRIMARY KEY,
   show_name VARCHAR(60) NOT NULL,
   is_booked BOOLEAN NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookings(
   id SERIAL PRIMARY KEY,

   user_id INT NOT NULL,
   seat_id INT NOT NULL,

   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

   CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
      REFERENCES users(id)
      ON DELETE SET NULL,

   CONSTRAINT fk_seat
      FOREIGN KEY(seat_id) 
      REFERENCES seats(id)
      ON DELETE SET NULL,

   CONSTRAINT unique_booking UNIQUE (seat_id)
);

ALTER TABLE bookings
ADD CONSTRAINT unique_seat UNIQUE (seat_id);
```

---

## 🪑 Populating Seats

If you want to insert your own seat data, feel free to do that.

Otherwise, you can quickly populate the seats table using this query:

```sql
INSERT INTO seats (name, show_name, is_booked)
SELECT 'A' || i, 'Dhurandhar', false
FROM generate_series(1, 20) AS i;
```

This will create 20 seats:

```
A1 → A20
```

---

## ⚙️ Environment Variables

Create a `.env` file:

```
URL=127.0.0.1
PORT=8000
MODE=Development

ACCESS_TOKEN_SECRET=your_secret
ACCESS_TOKEN_EXPIRES_IN=15m

REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRES_IN=7d
```

---

## ▶️ Running the Project

```bash
git clone https://github.com/Shriyansh10/booking_seva
cd booking_seva
npm install
npm run dev
```

---

## ⚠️ Notes

* Access tokens are stateless (not stored in DB)
* Refresh tokens are stored and managed securely
* Each seat can only be booked once (enforced by DB constraint)

---

## 📈 Future Improvements

* Add booking history per user
* Add admin controls
* Add rate limiting
* Improve validation & error handling

---

## 🤝 Final Thoughts

This project is less about building something flashy and more about understanding how backend systems actually work.

If you understand this deeply, you’re already ahead of most beginner backend developers.
