const { success, error } = require("../CommonFunction/Responses");
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth')
const admin = require('../firebase');
const empModel = require('../dbConnection/sequelize')

const register = async (req, res) => {
    try {
        let {email,password} = req.body

        if(!email && !password){
            let result = {
                status : 'Bad Request',
                Required : `{email,password}`
            }
            return error(400,result,res)
        }
        const userRecord = await admin.auth().createUser({
            email: email,
            password: password
        });
        return success(200, { uid: userRecord.uid }, res)
    } catch (err) {
        return error(500, { error: error.message }, res)
    }
}











const login = async (req, res) => {
    try {

        let {email,password} = req.body

        if(!email && !password){
            let result = {
                status : 'Bad Request',
                Required : `{email,password}`
            }
            return error(400,result,res)
        }
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                
                const user = userCredential.user;
                
                return success(200,user.stsTokenManager,res)
                
            })
            .catch((err) => {
                const errorCode = err.code;
                const errorMessage = err.message;

                return error(errorCode,errorMessage,res)
            });
        
    } catch (err) {
        // res.status(400).send({ error: err.message });
        return error(400,{ error: err.message },res)
    }
}
const InsertEmp = async (req, res) => {
    try {

        const {Name,Role,Department,Salary} = req.body

        if(!Name || !Role || !Department || (!Salary || !Number(Salary))){
            return error(400,"Bad Request",res)
        }

        try {
            const newEmployee = await empModel.create({
                Name: Name,
                Role: Role,
                Department: Department,
                Salary: Salary
              });
          
              console.log('New employee created:', newEmployee.toJSON());
        } catch (error) {
            return success(200, 'Duplicate Entry found for Name : '+Name,res)
        }
        
        return success(200, 'Successfuly Inserted',res)
        
    } catch (err) {
        
        return error(400,{ error: err.message },res)
    }
}



const RetriveAllEmployee = async (req, res) => {
    const { page = 1, limit = 1 } = req.body;

    if(!page && !limit){
        return error(400,"Bad Request",res)
    }

    
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);

    
    const offset = (pageInt - 1) * limitInt;

    try {
        const employees = await empModel.findAndCountAll({
            limit: limitInt,
            offset: offset
        });

        const totalPages = Math.ceil(employees.count / limitInt);

        const response = {
            totalItems: employees.count,
            totalPages: totalPages,
            currentPage: pageInt,
            itemsPerPage: limitInt,
            data: employees.rows
        };

        return success(200, response, res);
    } catch (err) {
        console.error('Error fetching employees:', err);
        return error(500, err.message, res);
    }
}



const RetriveSingleEmployee = async(req,res)=>{
    const employeeId = req.params.id;

  try {
    const employee = await empModel.findByPk(employeeId);

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    return success(200,employee.dataValues,res)
  } catch (err) {
    console.error('Error retrieving employee:', err);
    return error(500,err.message,res)
  }
}


const updateSingleEmployee = async(req,res)=>{
    const { id } = req.params;
    const { Name, Role, Department, Salary } = req.body;

    if(!id){
        return error(400,"Bad Request",res)
    }

    try {
        let employee = await empModel.findByPk(id);

        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        let result = employee.dataValues
        
        // Update employee attributes
        result.Name = Name ?? employee.Name;
        result.Role = Role ?? result.Role;
        result.Department = Department ?? result.Department;
        result.Salary = Salary ?? result.Salary;
        employee.dataValues = result
        
        await empModel.update(
            result,
            {
              where: {
                ID: Number(id),
              },
            },
          );

        return success(200,"Succesfully Updated",res)
    } catch (err) {
        console.error('Error updating employee:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}



const deleteSingleEmployee = async(req,res)=>{
    const { id } = req.params;
    

    if(!id){
        return error(400,"Bad Request",res)
    }

    try {
        
        const numDeletedRows = await empModel.destroy({
          where: {
            id: id 
          }
        });
    
        // console.log(`Deleted ${numDeletedRows} user(s)`);
        return success(200,`Deleted ${numDeletedRows} user(s)`,res)
      } catch (error) {
        console.error('Error deleting users:', error);
        return error(500,'Error deleting users: '+ error,res)
      }
}

module.exports = { register, login ,InsertEmp,RetriveAllEmployee,RetriveSingleEmployee,updateSingleEmployee,deleteSingleEmployee}