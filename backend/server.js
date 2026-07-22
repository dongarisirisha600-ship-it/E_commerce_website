import { initializeApp } from './app.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const app = await initializeApp();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
