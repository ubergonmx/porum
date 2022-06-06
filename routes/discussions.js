import express from 'express';
import Discussion from '../db/models/Discussion.js';

const discussionRoute = express.Router();

discussionRoute.get('/', async (req, res) => {
    console.log("Discussion page");
});

//CREATE
discussionRoute.post('/', async (req, res) => {
    try {
        const newDiscussion = new Discussion(req.body);
        const discussion = await newDiscussion.save();
        res.status(200).json(discussion);
    } catch (err) {
        res.status(500).json(err);
        return;
    }
});

//UPDATE
discussionRoute.put('/:id', async (req, res) => {
    try {
        const discussion = await Discussion.findByIdAndUpdate(req.params.id, {
            $set: req.body
        });
        res.status(200).json(discussion);
    } catch (err) {
        res.status(500).json(err);
        return;
    }
});

//DELETE
discussionRoute.delete('/:id', async (req, res) => {
    try {
        const discussion = await Discussion.findByIdAndDelete(req.params.id);
        res.status(200).json(discussion);
    } catch (err) {
        res.status(500).json(err);
        return;
    }
});

//GET
discussionRoute.get('/:id', async (req, res) => {
    try {
        const discussion = await Discussion.findById(req.params.id);
        res.status(200).json(discussion);
    } catch (err) {
        res.status(500).json(err);
        return;
    }
});



export default discussionRoute;
