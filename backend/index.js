const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const {connectDB}  = require('./config/db')
const postRouter = require('./routes/posts')

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB();

app.use('/api/posts',postRouter);
app.get('/', (req, res) => {
  res.send('SocioPulse Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
