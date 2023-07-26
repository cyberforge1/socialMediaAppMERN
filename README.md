# Social Media App with MERN Stack and Twilio Sendgrid Integration

## Description

This project is a Social Media App built using the MERN (MongoDB, Express, React, Node.js) stack. This app has been built directly from a tutorial on Youtube and some extra functionality has been added. The app allows users to register, login, post updates, and interact with other users by liking and commenting on their posts. Additionally, an extra functionality has been added to the app, which utilizes the Twilio Sendgrid API to send a user-specific email upon completing the registration process.

## Getting Started

To get started with the Social Media App, follow the instructions below:

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (v14 or higher)
- MongoDB (make sure MongoDB is running on your system)

### Installation

1. Clone the repository from GitHub using the following command:

```
git clone https://github.com/ed-roh/mern-social-media.git
```

2. Change into the project directory:

```
cd mern-social-media
```

3. Install server dependencies:

```
npm install
```

4. Change into the client directory:

```
cd client
```

5. Install client dependencies:

```
npm install
```

6. Go back to the project root directory:

```
cd ..
```

7. Create a `.env` file in the root directory and provide the necessary environment variables:

```
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
SENDGRID_API_KEY=<your_sendgrid_api_key>
```

Replace `<your_mongodb_uri>`, `<your_jwt_secret>`, and `<your_sendgrid_api_key>` with your actual MongoDB URI, a secret key for JWT authentication, and your Twilio Sendgrid API key, respectively.

### Running the App

1. Start the server:

```
npm start
```

The server will run on `http://localhost:5000`.

2. In a new terminal, change into the client directory:

```
cd client
```

3. Start the client:

```
npm start
```

The client will run on `http://localhost:3000`.

### Usage

1. Open your web browser and visit `http://localhost:3000` to access the Social Media App.
2. Register a new account and complete the registration process.
3. After completing the registration process, you will receive a user-specific email notification via Twilio Sendgrid.

## Dependencies

The server-side of the application has the following dependencies:

- `@sendgrid/mail`: Version 7.7.0
- `bcrypt`: Version 5.1.0
- `body-parser`: Version 1.20.1
- `cors`: Version 2.8.5
- `dotenv`: Version 16.0.3
- `express`: Version 4.18.2
- `gridfs-stream`: Version 1.1.1
- `helmet`: Version 6.0.0
- `jsonwebtoken`: Version 8.5.1
- `mongoose`: Version 6.7.0
- `morgan`: Version 1.10.0
- `multer`: Version 1.4.4
- `multer-gridfs-storage`: Version 5.0.2

## Acknowledgments

The original Social Media App project and tutorial were created by Ed Roh, and the source code can be found at [GitHub Link](https://github.com/ed-roh/mern-social-media).

Thank you to Twilio Sendgrid for providing the email functionality integration for the Social Media App.
