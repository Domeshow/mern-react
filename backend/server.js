const express = require('express');
const errorHandler = require('./middlewares/errorMiddleware');
const dotenv = require("dotenv").config();
const db = require("./config/db")

db ();
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const port = process.env.PORT || 4000;

app.use('/api/goals', require("./routes/goalRoutes"))

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})