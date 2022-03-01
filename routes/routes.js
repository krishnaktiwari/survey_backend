const express= require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const usr = require("../database/schema")

// user registration

router.post("/ur",async (req,res)=>{
    try{
        const pass = await bcrypt.hash(req.body.password, 10)
        const userss = new usr({
            _id:req.body._id,
            uuid:req.body.uuid,
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            password:pass,
            role:req.body.role,
            status:req.body.status,
            // image:req.body.image,
            created_by:req.body.created_by,
            created_at:req.body.created_at
        })
        const data = await usr.insertMany(userss)
        console.log("user registered succesfully")
        res.send("user registered succesfully")
    }
    catch(err){
        res.send({err:err.message})
        console.log(err)
    }
})




// user login

router.post("/login",async (req,res)=>{
    try{
        const userdata = await usr.findOne({email:req.body.email})
        if(userdata){
            const compare = await bcrypt.compareSync(req.body.password,userdata.password)
            if(compare){
                const token = generateToken(req.body)
                res.send(token)
                console.log("login succesfull",token)
            }else{
                console.log("wrong password entered")
                res.send("wrong password entered")
            }
        }else{
            res.send("user not found")
            console.log("user not found")
        }
    }
    catch(err){
        res.send(err)
        console.log(err)
    }
})



module.exports = router