# newscove
Newscove is a dynamic and user-friendly news platform that delivers the latest news articles across multiple categories designed in NodeJS and Express

## Getting Started

Follow these steps to set up the project on your local machine.

### 1. Clone the Repository

git clone https://github.com/arunajain/newscove.git
cd newscove

### 2. Install Dependencies 

npm install 

4. Run the project

### 3. Environment Variables(Set up your `.env` file (see `.env.example`))

This project uses environment variables to store sensitive configuration such as API keys, database credentials, etc.

Create a `.env` file in the root directory based on the provided `.env.example`:

Then update the values in `.env` with your own credentials.

### 4. Set Up the PostgreSQL Database
Run the SQL files located in the `newscove/db/` directory:
#### Create tables
psql -U your_user -d your_database -f db/schema.sql

#### Seed initial data
psql -U your_user -d your_database -f db/seed.sql


### 5. Start the Project
npm start