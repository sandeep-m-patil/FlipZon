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

// CORS Configuration
app.use(cors({
    origin: [
        'https://mern-flipzon.vercel.app',
        'https://mern-flipzon.vercel.app/',
        'http://localhost:5173',
        'http://localhost:5174'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());


// Basic route for testing
app.get('/', (req, res) => {
    res.json({ message: 'API is running...' });
});

const startServer = async () => {
    try {
        await connectDB();
        
        const PORT = process.env.PORT || 5000;
        const server = app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

        server.on('error', (error) => {
            if (error.code === 'EADDRINUSE') {
                console.log(`Port ${PORT} is busy, trying ${PORT + 1}`);
                server.listen(PORT + 1);
            } else {
                console.error('Server error:', error);
            }
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

