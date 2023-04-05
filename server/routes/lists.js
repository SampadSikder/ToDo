const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');

const { List, Task, User } = require("../models")

let authenticate = (req, res, next) => {
    let token = req.header('x-access-token');

    // verify the JWT
    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            res.status(401).send(err);
        } else {
            // jwt is valid
            req.user_id = decoded._id;
            next();
        }
    });
}

const deleteTasksFromList = (_listId) => {
    Task.deleteMany({
        _listId
    }).then(() => {
        console.log("Tasks from " + _listId + " were deleted!");
    })
}



router.get("/", authenticate, async (req, res) => {
    await List.find({
        _userId: req.user_id
    }).then((lists) => {
        res.json(lists);
    }).catch((e) => {
        res.send(e);
    });
})

router.get("/:id", authenticate, async (req, res) => {
    await List.findOne({
        _id: req.params.id
    }).then((lists) => {
        res.json(lists);
    }).catch((e) => {
        res.send(e);
    });
})


router.post("/", authenticate, async (req, res) => {
    let title = req.body.title;
    let newList = new List({
        title,
        _userId: req.user_id
    });
    await newList.save().then((listdoc) => {
        res.json(listdoc);
    });
})

router.patch("/:id", authenticate, async (req, res) => {
    console.log("edit")
    await List.findOneAndUpdate({ _id: req.params.id, _userId: req.user_id }, {
        $set: req.body
    }).then((response) => {
        res.json("Updated!");
    });
});


router.delete('/:id', authenticate, async (req, res) => {

    List.findOneAndRemove({
        _id: req.params.id,
        _userId: req.user_id
    }).then((removedListDoc) => {
        res.send(removedListDoc);
        deleteTasksFromList(removedListDoc._id);
    })
});



module.exports = router;