



const success = (status,message,res)=>{


    let result = {
        error: false,
        data : message
    }
    
    
   return res.status(status).send(result)
}


const error = (status,message,res)=>{


    let result = {
        error: true,
        data : message
    }
    
    
   return res.status(status).send(result)
}

module.exports = {success,error}