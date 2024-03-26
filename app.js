const express = require('express');
const connectDB = require('./src/config/mongoose-connection');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

console.log(process.env.PORT )

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world!');
});

connectDB();

app.listen(PORT, () => {
    console.log('Server running...')
})

