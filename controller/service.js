const jwt = require("jsonwebtoken");

const service = (token) => {
  jwt.verify(token, process.env.hash, (err, decoded) => {
    if (err) {
      return err
      } else {
        return decoded;
      }
    });
  };



module.exports = service;

