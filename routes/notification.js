import express from 'express';
import Notification from '../db/models/Notification.js';

const notificationRoute = express.Router();

//SEND NOTIFICATION
notificationRoute.post('/', async (req, res) => {
    try {
        const newNotification = new Notification(req.body);
        const notification = await newNotification.save();
        res.status(200).json(notification);
    } catch (err) {
        res.status(500).json(err);
        return;
    }

});

//GET ALL NOTIFICATIONS
notificationRoute.get('/all', async (req, res) => {
});