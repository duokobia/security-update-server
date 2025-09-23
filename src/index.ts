import express from 'express';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Home Page!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
