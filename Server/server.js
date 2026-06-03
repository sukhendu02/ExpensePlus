import app from './app.js';

const PORT = process.env.PORT || 5000;

// STARTING THE SERVER
const startServer = async () => {
   app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();