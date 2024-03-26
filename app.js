const express = require('express');
const connectDB = require('./src/config/mongoose-connection');
const errorHandler = require('./src/middleware/errorHandler');
const userRouter = require('./src/routes/user.routes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3002;

console.log(process.env.PORT )

app.use(express.json());

connectDB();

app.use('/api/users', userRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

