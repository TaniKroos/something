const http = require('http');
require('dotenv').config();
const app = require('./app');  // Import the app instance
const { mongoConnect } = require('./service/mongo'); // Adjust the path as needed

const server = http.createServer(app);

async function startServer() {
    try {
        // Connect to MongoDB
        await mongoConnect();
        console.log('MongoDB connected successfully');

        // Start the server
        server.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error('Error starting the server:', error);
        process.exit(1);  // Exit the process if there's an error
    }
}

startServer();
