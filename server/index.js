const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const mongoURI = 'mongodb+srv://bsse1219:Kj25S6ehj0owNuvc@todo.9vgzllg.mongodb.net/ToDo-app?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

const listRouter = require("./routes/lists");
app.use("/lists", listRouter);

const taskRouter = require("./routes/tasks");
app.use("/lists", taskRouter);

const userRouter = require("./routes/users");
app.use("/user", userRouter);

const otpRouter = require("./routes/otp");
app.use("/otp", otpRouter);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
    console.log("connected to db")
    app.listen(5050, () => {
        console.log("Server running");
    });
}).catch((err) => console.log(err));


