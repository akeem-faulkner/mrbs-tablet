var db = require('./config');

module.exports = function (req, res, next) {
    try {
        db.one('SELECT * FROM mrbs_room WHERE id = ?', [req.query['id']], function (err, row) {
            if (err) {
                res.status(400).send(err);
            } else {
                res.status(200).json(row);
            }
        });
    } catch (e) {
    }


}