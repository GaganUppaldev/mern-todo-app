//here will be server side code using express.js
import express from 'express';
import cors from 'cors';

const app = express();
const port = 7000;

app.use(cors()); // Use cors middleware

app.use(express.json()); // For parsing application/json

app.post('/print', (req, res) => {
    console.log('POST request received!');
    console.log('Message:', req.body.message);
    res.send('Message received! Check your console!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
