1. Tripper - A Full-Stack Travel Itinerary Management Platform

2. Tripper is a MERN-stack-based travel assistant designed to simplify trip planning, sharing, and expense tracking. Users can create itineraries, collaborate with friends, track shared expenses, and exchange real-time travel experiences — all in one place.
- Create and manage multi-day trip itineraries
- Add members to collaborate on trips
- Track and split expenses among group members
- Share itineraries with others
- JWT-based authentication
- Responsive UI with reusable React components

3. Tech Stack:
- Frontend: React, TypeScript, Tailwind CSS
- State Management: React Query
- Routing: React Router
- Backend: Express.js, Node.js
- Database: MongoDB
- Authentication: JWT
- Deployment: Vercel (Frontend)/(Backend)

4. Architecture Flow
(.frontend/assets/tripper_architecture.png)

User → React App → Express API → MongoDB  
            ↑                    ↓  
     React Query         Auth (JWT)

5. Installation

# Clone the repo
git clone https://github.com/tanishqpandey26/Tripper.git
cd tripper

# For client
cd client
npm install
npm run dev

# For server
cd server
npm install
npm start

6. Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
