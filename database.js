/*I have spended whole from Morning to End in solvind one error named( ENCONNECTION refused ) it came in both mongoDB and than postsql actually
trying to create API and only Database was left so i choose mongo but i caused error i tried hard but failed to solve than i moved to postgresql 
, installed it  created full setput , connected it , install package named pg but at the end again same error , checked fire fall so This is 
problem which need to be noted as in starting very frustating  can't solved after spending whole day*/

//Used Docker to solve this now
//Express code is below
import express from 'express';
import mongoose from 'mongoose';

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
