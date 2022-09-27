const bcrypt = require('bcrypt')
const connection = require('../express/mysql')
const jwt = require('jsonwebtoken');
const service = require('./service');

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    
    
    connection.query('SELECT id,password,status FROM `user` WHERE `email` = ?', [email], (err, results, fields) => {
      if (err) {
        return res.status(400).send(err)
      }

      if (results.length > 0) {
        const pass = results[0].password;
        bcrypt.compare(password, pass, (err, result) => {
         
          if(result&&results[0].status===1&&!err){
            const token = jwt.sign({ id: results[0].id }, process.env.hash, {
              expiresIn: '2 days'
            })

            connection.query('UPDATE `user` SET `last_login_time` = ? WHERE `id` = ?', [new Date(), results[0].id], (err, results, fields) => {
              if (err) {
                console.log(err)
              }
            })
            return res.send(token)
          }

        })
      }

    });
  }

  async admin(req, res) {
    // req header bearer token 
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.hash, (err, decoded) => {
      if (err) {
        return res.status(401).send('Error')
      }
      connection.query('select status from user where id=?', decoded.id, (err,results,fields)=>{
        if (err||results.length==0||results[0].status==0) {
          return res.status(400).send('Error')
        }
        else{
          connection.query('SELECT id,name,email,last_login_time,registration_time,status FROM `user`', (err, results, fields) => {
            if (err) {
              return res.status(400).send('Error')
            }
           else{
            return res.status(200).json(results)
           }
          })
        }
      })
    })
  }

  async block(req, res) {
    const token = req.body.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.hash, (err, decoded) => {
      if (err) {
        return res.status(400).send('Error')
      }
      const {id} = req.body;
      id.forEach(element => {
        connection.query(`UPDATE user SET status=0 WHERE id=?`, [element], (err,results,fields)=>{
          if (err) {
            return res.status(400).send('Error')
          }
        })
          

      });

      connection.query(`SELECT id,name,email,last_login_time,registration_time,status FROM user`, (err,results,fields)=>{
        if (err) {
          return res.status(400).send('Error')
        }

        return res.status(200).json(results)
        
      });

    })
  }

  async unblock(req, res) {
    const token = req.body.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.hash, (err, decoded) => {
      if (err) {
        return res.status(400).send('Error')
      }
      const {id} = req.body;
      id.forEach(element => {
        connection.query(`UPDATE user SET status=1 WHERE id=?`, [element], (err,results,fields)=>{
          if (err) {
            return res.status(400).send('Error')
          }
        })
          

      });

      connection.query(`SELECT id,name,email,last_login_time,registration_time,status FROM user`, (err,results,fields)=>{
        if (err) {
          return res.status(400).send('Error')
        }

        return res.status(200).json(results)
        
      });

    })
  }

  async delete(req, res) {
    const token = req.body.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.hash, (err, decoded) => {
      if (err) {
        return res.status(400).send('Error')
      }
      const {id} = req.body;
      id.forEach(element => {
        connection.query(`delete from user WHERE id=?`, [element], (err,results,fields)=>{
          if (err) {
            return res.status(400).send('Error')
          }
        })
          

      });

      connection.query(`SELECT id,name,email,last_login_time,registration_time,status FROM user`, (err,results,fields)=>{
        if (err) {
          return res.status(400).send('Error')
        }

        return res.status(200).json(results)
        
      });

    })
  }
}


module.exports = new AuthController();