const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://bsse1219:Kj25S6ehj0owNuvc@todo.9vgzllg.mongodb.net/ToDo-app?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json());

const listRouter = require("./routes/lists");
app.use("/lists", listRouter);

const taskRouter = require("./routes/tasks");
app.use("/lists", taskRouter);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
    console.log("connected to db")
    app.listen(5050, () => {
        console.log("Server running");
    });
}).catch((err) => console.log(err));

console.log("Ami chakri pabo na")