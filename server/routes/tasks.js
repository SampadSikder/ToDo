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

router.get("/:listId/tasks/:taskId", async (req, res) => {
    await Task.findOne({
        _id: req.params.taskId
    }).then((response) => {
        res.json(response);
    });
});

router.post('/:listId/tasks', async (req, res) => {
    await List.findOne({
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
                _listId: req.params.listId,
                completed: req.body.completed,
                dueDate: req.body.dueDate
            });
            newTask.save().then((newTaskDoc) => {
                res.send(newTaskDoc);
            })
        } else {
            res.sendStatus(404);
        }
    })
});

router.patch('/:listId/tasks/:taskId', async (req, res) => {
    await List.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list) => {
        if (list) {
            return true;
        }
        return false;
    }).then((canUpdateTasks) => {
        if (canUpdateTasks) {
            Task.findOneAndUpdate({
                _id: req.params.taskId,
                _listId: req.params.listId
            }, {
                $set: req.body
            }
            ).then(() => {
                res.send({ message: 'Updated successfully.' })
            })
        } else {
            res.sendStatus(404);
        }
    })
});

router.delete('/:listId/tasks/:taskId', async (req, res) => {
    await List.findOne({
        _id: req.params.listId,
        //_userId: req.user_id
    }).then((list) => {
        if (list) {
            return true;
        }
        return false;
    }).then((canDeleteTasks) => {

        if (canDeleteTasks) {
            Task.findOneAndRemove({
                _id: req.params.taskId,
                _listId: req.params.listId
            }).then((removedTaskDoc) => {
                res.send(removedTaskDoc);
            })
        } else {
            res.sendStatus(404);
        }
    });
});






module.exports = router;