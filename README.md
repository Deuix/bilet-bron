# Flight Booking System

A web application for searching flights and generating booking confirmations using the Aviasales API.

## Features

- Search flights using real-time data from Aviasales API
- Select flights and enter passenger details
- Generate PDF booking confirmation documents
- Modern, responsive UI built with Material-UI

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Aviasales API Token

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env` in the backend directory
   - Add your Aviasales API token to the `.env` file

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Development

- Frontend: React + TypeScript + Vite + Material-UI
- Backend: Node.js + Express + TypeScript
- API: Aviasales Flight Search API
- PDF Generation: jsPDF

## License

MIT 