const express = require("express");
const router = express.Router();

const { List, Task } = require("../models");


router.get("/:listId/tasks", async (req, res) => {
    await Task.find({
        _listId: req.params.listId
    }).then((response) => {
        res.json(response);
    });
});

router.post('/lists/:listId/tasks', async (req, res) => {
    List.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list) => {
        if (list) {
            return true;
        }
        return false;
    }).then((canCreateTask) => {
        if (canCreateTask) {
            let newTask = new Task({
                title: req.body.title,
                _listId: req.params.listId
            });
            newTask.save().then((newTaskDoc) => {
                res.send(newTaskDoc);
            })
        } else {
            res.sendStatus(404);
        }
    })
})







module.exports = router;