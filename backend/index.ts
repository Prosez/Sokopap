import * as express from 'express';
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import sequelize from './database';
import productRoutes from './routes/productRoutes';
import { NextFunction } from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Mock user database (replace with real database in production)
const users: Array<{ email: string; password: string; fullname: string; phone: string; address: string }> = [];

// Middleware to parse incoming JSON requests
app.use(express.json());

// Secret key for JWT, stored in environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Use a strong, environment-specific secret key

// Middleware to authenticate JWT tokens
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // Attach the user information to req.user
    next();
  });
}

// Sign-up Route
app.post('/api/signup', async (req, res) => {
  const { email, password, fullname, phone, address } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if the user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  // Create a new user and add to the mock database
  const newUser = { email, password: hashedPassword, fullname, phone, address };
  users.push(newUser);

  res.json({ success: true, user: { email, fullname, phone, address } });
});

// Sign-in Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email);

  if (!user) {
    return res.status(401).json({ success: false, message: 'Authentication failed' });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ success: false, message: 'Authentication failed' });
  }

  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ success: true, token });
});

app.use('/api', productRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch((err: Error) => {
    console.error('Unable to connect to the database:', err);
  });
