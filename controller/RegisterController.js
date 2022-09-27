const bcrypt = require('bcrypt');
const connection = require('../express/mysql');
const { validationResult } = require('express-validator');
class RegisterController {
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send(
          errors.array()
        )
      }
      const { name, email, password } = req.body;
      const userpass = await bcrypt.hash(password, 10);

      const user = {
        name,
        email,
        password: userpass,
        registration_time: new Date(),
        last_login_time: new Date(),
        status: 1
      };

      const query = connection.query(`INSERT INTO user SET ?`, user, (err, results, fields) => {
        if (err) {
          console.log(err);
          return res.status(400).send([
            {
              "value": "Registered",
              "msg": "Already registered this email",
              "param": "connection",
              "location": "db"
            }
          ])
        }
       
       
        res.send('Success')
      });

    } catch (error) {
      res.status(400).send('Error')
    }
  }
}

module.exports = new RegisterController()