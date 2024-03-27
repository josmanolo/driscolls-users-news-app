const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/mongoose-connection');
const errorHandler = require('./src/middleware/errorHandler');
const userRouter = require('./src/routes/user.routes');
const authRouter = require('./src/routes/auth.routes');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

console.log(process.env.PORT )

app.use(express.json());

connectDB();

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

