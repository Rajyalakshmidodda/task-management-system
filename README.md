\# Task Management System



\## Project Description

A full-stack Task Management System built using:

\- Spring Boot (Backend)

\- HTML, CSS, JavaScript (Frontend)

\- MySQL Database



\## Features

\- User Registration \& Login

\- Add Tasks

\- View Tasks

\- Mark Tasks as Completed

\- Delete Tasks



\## Tech Stack

Backend: Spring Boot  

Frontend: HTML/CSS/JS  

Database: MySQL  

Build Tool: Maven  



\## API Endpoints



\### User APIs

POST /api/users/register  

POST /api/users/login  



\### Task APIs

POST /api/tasks  

GET /api/tasks  

PUT /api/tasks/{id}  

DELETE /api/tasks/{id}



\## Database Tables



\### User Table

\- id (Primary Key)

\- username

\- password



\### Task Table

\- id (Primary Key)

\- title

\- description

\- status

\- user\_id (Foreign Key)



\## How to Run

1\. Clone repository

2\. Configure database in application.properties

3\. Run using:

&nbsp;  mvn spring-boot:run



---



Developed by Rajyalakshmi Dodda



