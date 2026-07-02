import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // 1. Security Headers with Helmet
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          imgSrc: ["'self'", "data:", "blob:", "https:"],
          connectSrc: ["'self'", "ws:", "wss:"], // For Vite HMR and API requests
          frameAncestors: null, // Allow embedding in iframes (AI Studio)
        },
      },
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false, // Prevents loading assets cross-origin if needed
      crossOriginOpenerPolicy: false,
      frameguard: false, // Disable X-Frame-Options to allow iframe embedding
    })
  );

  // 2. Cross-Origin Resource Sharing (CORS)
  app.use(cors());

  // 3. Rate Limiting to prevent brute-force and DDoS
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 1000 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });
  app.use(limiter);

  // 4. Body parsing
  app.use(express.json({ limit: '10kb' })); // Limit body size to prevent large payloads
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));

  // API Routes (must be defined before Vite middleware)
  app.get('/api/health', (req, res) => {
    res.json({ status: 'secure and healthy' });
  });

  // Stricter rate limit for login attempts to slow down brute-force guessing
  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // only 10 login attempts per IP per window
    message: { success: false, message: 'Too many login attempts. Please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Admin login: credentials are checked server-side only.
  // The real username/password NEVER get sent to the browser as source code.
  app.post('/api/admin/login', loginLimiter, (req, res) => {
    const { username, password } = req.body || {};
    const validUser = process.env.ADMIN_USERNAME;
    const validPass = process.env.ADMIN_PASSWORD;

    if (!validUser || !validPass) {
      console.error('ADMIN_USERNAME / ADMIN_PASSWORD not set in environment variables.');
      return res.status(500).json({ success: false, message: 'Server not configured.' });
    }

    if (username === validUser && password === validPass) {
      const token = Buffer.from(`${Date.now()}-${Math.random()}`).toString('base64');
      return res.json({ success: true, token });
    }

    return res.status(401).json({ success: false, message: 'Invalid username or password' });
  });

  // Vite middleware for development or Static files for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Secure server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
    console.error("Failed to start server:", err);
});
