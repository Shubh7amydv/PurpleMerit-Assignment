const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverconfig');
const connectDB = require('./config/database');
const apiRoutes = require('./routes/index');
const seedDatabase = require('./utils/seed-database');

const allowedOrigins = [
  'http://localhost:3000',
  'https://purple-merit-assignment-re3w.vercel.app',
  process.env.FRONTEND_URL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
].filter(Boolean);

const setupAndStartServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Seed database with initial data
    try {
      await seedDatabase();
    } catch (seedError) {
      console.error('Database seeding error:', seedError.message);
      // Continue anyway - seeding failure shouldn't prevent server startup
    }

    // Create Express app
    const app = express();

    // Middleware
    app.use(cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || /\.vercel\.app$/i.test(origin)) {
          return callback(null, true);
        }

        return callback(new Error(`CORS blocked for origin: ${origin}`));
      },
      credentials: true
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // API Routes
    app.use('/api', apiRoutes);

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error('Unhandled error:', err);
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        data: {},
        err: err.message
      });
    });

    // Start server
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
      console.log(`API Health Check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

setupAndStartServer();
