require('dotenv').config()
const jwt = require("jsonwebtoken")

function generateToken(user){
    return jwt.sign({user},process.env.secret)
}

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token,process.env.secret,(err,data)=>{
        console.log(err)
        if(err) return res.send(err)
        req.data = data
        
        next()
    })
}

module.exports = {generateToken,authenticateToken}