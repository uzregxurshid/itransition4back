const express = require('express');
const RegisterController = require('../controller/RegisterController');
const router = express.Router();
const { body } = require('express-validator');
const AuthController = require('../controller/AuthController');


router.post('/register',
  body('name').isLength({ min: 2 }),
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  RegisterController.register)

router.post('/login',AuthController.login);

router.get('/admin', AuthController.admin)
router.post('/block', AuthController.block)
router.post('/unblock',AuthController.unblock)
router.post('/delete',AuthController.delete)
module.exports = router




