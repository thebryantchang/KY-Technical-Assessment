import express from 'express';
import cors from 'cors';
import formRoutes from './routes/formRoutes';
import { initDB } from './db';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api', formRoutes);


initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to database:', err);
});
