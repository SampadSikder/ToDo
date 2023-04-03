const express = require("express");
const router = express.Router();

const { List, Task } = require("../models")

router.get("/", async (req, res) => {
    await List.find().then((lists) => {
        res.json(lists);
    }).catch((e) => {
        res.send(e);
    });
})

router.post("/", async (req, res) => {
    let title = req.body.title;
    let newList = new List({
        title
    });
    await newList.save().then((listdoc) => {
        res.json(listdoc);
    });
})

router.patch("/:id", async (req, res) => {
    await List.findOneAndUpdate({ _id: req.params.id }, {
        $set: req.body
    }).then((response) => {
        res.send("Updated!");
    });
});

router.delete('/:id', async (req, res) => {

    List.findOneAndRemove({
        _id: req.params.id,
        //_userId: req.user_id
    }).then((removedListDoc) => {
        res.send(removedListDoc);
        deleteTasksFromList(removedListDoc._id);
    })
});



module.exports = router;