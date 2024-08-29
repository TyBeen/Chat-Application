const Room = require('../models/room');

function authorization (req, res, next) {

    if (req.body.isAdmin) {
        return next();
    }

    Room.findById(req.params._id, (err, room) => {
        if (err || !room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        if (room.creator === req.body._id) {
            return next();
        } else {
            return res.status(403).json({ message: 'Access denied' });
        }
    });
};

module.exports = authorization;