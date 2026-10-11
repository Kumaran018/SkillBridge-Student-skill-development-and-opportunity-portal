import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.js';
import { loadDatabase } from './db/database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize & load database
loadDatabase();

// Middleware
app.use(cors());
app.use(express.json());

// Request logger for dev
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// API Routes
app.use('/api', apiRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to SkillBridge API – Student Skill Development & Opportunity Portal',
    documentation: '/api/health',
    endpoints: [
      '/api/opportunities',
      '/api/quizzes',
      '/api/resources',
      '/api/users',
      '/api/leaderboard'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 SkillBridge Server running on http://localhost:${PORT}`);
  console.log(`📡 Healthcheck available at http://localhost:${PORT}/api/health`);
});
