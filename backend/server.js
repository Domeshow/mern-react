const express = require('express');
const dotenv = require("dotenv").config();

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const port = process.env.PORT || 4000;

app.use('/api/goals', require("./routes/goalRoutes"))

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})