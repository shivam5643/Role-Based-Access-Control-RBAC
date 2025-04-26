import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config/config.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';

// Initialize express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('RBAC Blog API Running');
});

// Connect to MongoDB
mongoose.connect(config.mongoUri)
  .then(() => {
    console.log('MongoDB connected');
    
    // Start server
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  process.exit(1);
});