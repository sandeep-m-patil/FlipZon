import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRotues.js';
import cartRoutes from './routes/cartRoutes.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// Start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
