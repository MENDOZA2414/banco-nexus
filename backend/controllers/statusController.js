// controllers/statusController.js
const db = require('../config/db');

const getStatus = (req, res) => {
  res.json({
    host: db.getCurrentHost(),
    readOnly: db.isReadOnly()
  });
};

module.exports = {
  getStatus
};
