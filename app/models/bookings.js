var db = require('./config');

module.exports = function (req, res, next) {
    try {
        db.query('SELECT * FROM mrbs_entry WHERE room_id = ? AND unix_timestamp(start_time) >= ? AND unix_timestamp(end_time) <= ?', [req.query['room'], req.query['after'], req.query['before']], function (err, row) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).json({data: row});
            }
        });
    } catch (e) {

    }

};