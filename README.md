## URL Shortening Service
   Overview
   This project is a URL shortening service that provides users with the ability to shorten long URLs, track the performance of their shortened links, and retrieve analytics on how those links are being accessed. The backend is built using Node.js with Express, and the frontend is developed using React. Redis is used for caching to improve performance, and Docker is utilized for containerization, making it easier to deploy and run the application locally.
   Key Features:
  1.	User Authentication: Users can authenticate via Google Sign-In to access and manage their shortened URLs.
  2.	Create Short URL API: Allows users to shorten URLs and optionally set custom aliases and topics.
  3.	Redirect Short URL API: Redirects users from a short URL to its original long URL while logging analytics.
  4.	Analytics APIs: Provide detailed analytics, including overall stats, URL-specific stats, and topic-based stats.
  5.	Caching with Redis: Utilizes Redis to store and quickly retrieve short URLs and their analytics, enhancing performance.
________________________________________

## Screenshots 
![image](https://github.com/user-attachments/assets/9f81a62a-8da9-409b-850a-168870b26ed5)

## Hosted Link:-
backend api are hosted at https://url-shortner-app-rbyi.onrender.com

and frontend hosted at https://spiffy-bublanina-abcbf4.netlify.app/

Frontend should be available at http://localhost:5173. on your local machine 
Backend API should be available at http://localhost:5600. on your local machine

## IMPORTENT NOTE:-
there is no issue with the code , when testing with swagger docs the GET request has been blocked by browser offical policy even though we have configered CORS in backend
so when you use live hosted link the dashboard api will throw an error

recommended to use postman for testing and localy install and run the project, replace hosted api with http://localhost:5600 in only frontend when fetching data in local machine 

due to google oath 2024 standerds there is a cors error in frontend which can be fixed by google team only 

## API Endpoints
1. User Authentication API
POST http://localhost:5600/api/auth/google
•	Method: POST
•	Description: Authenticates users using Google Sign-In.
•	Request Body:
json
Copy code
{
  "googleToken": "string"
}
•	Response:
json
Copy code
{
  "authToken": "string"
}
2. Create Short URL API
POST http://localhost:5600/api/url
•	Method: POST
•	Description: Shortens a provided long URL.
•	Request Body:
json
Copy code
{
  "longUrl": "string",
  "customAlias": "string (optional)",
  "topic": "string (optional)"
}
•	Response:
json
Copy code
{
  "shortUrl": "string",
  "createdAt": "datetime"
}
3. Redirect Short URL API
GET http://localhost:5600/api/url/{alias}
•	Method: GET
•	Description: Redirects to the original long URL using the short URL alias.
•	Response: A redirect to the original URL.
4. Get URL Analytics API
GET http://localhost:5600/api/url/analytics/{alias}
•	Method: GET
•	Description: Retrieves analytics for a specific short URL.
•	Response:
json
Copy code
{
  "totalClicks": "number",
  "uniqueUsers": "number",
  "clicksByDate": [
    {
      "date": "YYYY-MM-DD",
      "clickCount": "number"
    }
  ],
  "osType": [
    {
      "osName": "string",
      "uniqueClicks": "number",
      "uniqueUsers": "number"
    }
  ],
  "deviceType": [
    {
      "deviceName": "string",
      "uniqueClicks": "number",
      "uniqueUsers": "number"
    }
  ]
}
5. Get Topic-Based Analytics API
GET http://localhost:5600/api/url/analytics/topic/{topic}
•	Method: GET
•	Description: Retrieves analytics for all short URLs grouped under a specific topic.
•	Response:
json
Copy code
{
  "totalClicks": "number",
  "uniqueUsers": "number",
  "clicksByDate": [
    {
      "date": "YYYY-MM-DD",
      "clickCount": "number"
    }
  ],
  "urls": [
    {
      "shortUrl": "string",
      "totalClicks": "number",
      "uniqueUsers": "number"
    }
  ]
}
6. Get Overall Analytics API
GET http://localhost:5600/api/url/analytics/overall
•	Method: GET
•	Description: Retrieves overall analytics for all short URLs created by the authenticated user.
•	Response:
json
Copy code
{
  "totalUrls": "number",
  "totalClicks": "number",
  "uniqueUsers": "number",
  "clicksByDate": [
    {
      "date": "YYYY-MM-DD",
      "clickCount": "number"
    }
  ],
  "osType": [
    {
      "osName": "string",
      "uniqueClicks": "number",
      "uniqueUsers": "number"
    }
  ],
  "deviceType": [
    {
      "deviceName": "string",
      "uniqueClicks": "number",
      "uniqueUsers": "number"
    }
  ]
}
7. Caching with Redis
•	Redis is used for caching short URL data and analytics. When a short URL is created or analytics are queried, the results are stored in Redis for quicker access in future requests.
________________________________________
## Installation and Setup
   Prerequisites
•	Docker for containerization.
•	Node.js (v14 or higher).
•	Redis for caching (can be run in a Docker container).
• React for frontend

Steps to Run the Application Locally
1.	Clone the repository:

Copy code
git clone https://github.com/Sparsh55/URL-Shortner-App.git, 
cd URL-SHORTNER

2.	Install backend dependencies: In the backend directory:

cd Backend, 
npm install

3.	Install frontend dependencies: In the frontend directory:
   
cd client, 
npm install, 
for fixting react auth error run , 
npm install --legacy-peer-deps

5.	Set up environment variables:
Create a .env file in the  Backend root directory and add the following variables:

GOOGLE_CLIENT_ID=your-google-client-id
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your-jwt-secret

6.	Start Redis using Docker: Run the following command to start Redis:

docker run -p 6379:6379 --name redis -d redis
8.	Run the backend API: In the backend directory, run:

npm start

9.	Run the frontend React application: In the frontend directory, run:

npm start

10.	Access the application:
Frontend should be available at http://localhost:5173. 
Backend API should be available at http://localhost:5600.
________________________________________
Testing the Endpoints
You can test the API using tools like Postman or curl.
1. User Authentication
•	Endpoint: POST http://localhost:5600/api/auth/google
•	Test: Provide a valid Google token.
•	Response:
json
Copy code
{
  "authToken": "jwt-token"
}
2. Create Short URL
•	Endpoint: POST http://localhost:5600/api/url
•	Test: Provide a valid long URL in the request body.
•	Response:
json
Copy code
{
  "shortUrl": "http://short.url/abc123",
  "createdAt": "2024-12-28T12:00:00Z"
}
3. Redirect Short URL
•	Endpoint: GET http://localhost:5600/api/url/{alias}
•	Test: Replace {alias} with a valid alias.
•	Response: Redirects to the original URL.
4. Get URL Analytics
•	Endpoint: GET http://localhost:5600/api/url/analytics/{alias}
•	Test: Replace {alias} with a valid alias.
•	Response:
json
Copy code
{
  "totalClicks": 100,
  "uniqueUsers": 50,
  "clicksByDate": [
    {
      "date": "2024-12-28",
      "clickCount": 50
    }
  ]
}
5. Get Topic-Based Analytics
•	Endpoint: GET http://localhost:5600/api/url/analytics/topic/{topic}
•	Test: Replace {topic} with a valid topic name.
•	Response:
json
Copy code
{
  "totalClicks": 500,
  "uniqueUsers": 200,
  "clicksByDate": [
    {
      "date": "2024-12-28",
      "clickCount": 100
    }
  ],
  "urls": [
    {
      "shortUrl": "http://short.url/abc123",
      "totalClicks": 100,
      "uniqueUsers": 50
    }
  ]
}
________________________________________
Docker Support
1.	Build Docker images:

docker-compose build
2.	Run the application with Docker:

docker-compose up
This will start both the frontend and backend services, along with Redis in a container.
________________________________________
## License
This project is licensed under the MIT License.
## Developed by Sparsh Saxena

