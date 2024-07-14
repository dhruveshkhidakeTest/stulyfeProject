const express = require('express');
const router = express.Router();

const { register, login, InsertEmp, RetriveAllEmployee, RetriveSingleEmployee,updateSingleEmployee,deleteSingleEmployee } = require('../component/mainApi');
const authenticate = require('../authenticator');




router.post('/register',register)


router.post('/login',login)

router.post('/employees',authenticate,InsertEmp)
router.get('/employees',authenticate,RetriveAllEmployee)
router.get('/employees/:id',authenticate,RetriveSingleEmployee)
router.put('/employees/:id',authenticate,updateSingleEmployee)
router.delete('/employees/:id',authenticate,deleteSingleEmployee)




module.exports = router