const express = require('express');
const bodyParser = require('body-parser');
const accessController = require('../middleware/access-controller.js');

const postModel = require('../model/todos.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(accessController); // Allows cross-origin HTTP requests

// List
router.get('/todos', function(req, res, next) {
    const {unaccomplishedOnly, searchText, start} = req.query;
    console.log('-----------------')
    console.log(`${unaccomplishedOnly}`)
    console.log('-----------------')
    postModel.list(searchText, unaccomplishedOnly, start).then(posts => {
        console.log(`server unaccomplishedOnly: ${unaccomplishedOnly}`)
        res.json(posts);
    }).catch(next);
});

// Create
router.post('/todos', function(req, res, next) {
    const {mood, text} = req.body;
    if (!mood || !text) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    postModel.create(mood, text).then(post => {
        res.json(post);
    }).catch(next);
});

// Done
router.post('/todos/:id', function(req, res, next) {
    console.log('hello')
    const {id} = req.params;
    console.log("routers done" + id)
    if (!id) {
        const err = new Error('ID of accomplished task are required');
        err.status = 400;
        throw err;
    }
    //id.toString();
    postModel.accomplish(id).then(post => {
        res.json(post);
    }).catch(next);
});



module.exports = router;
