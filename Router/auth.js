const express = require("express")
const router = express.Router()
const db = require("../db")
const jwt = require("jsonwebtoken")
router.get("/",(req,res)=>{
    res.send("Hello This is atuh")
})
// This is for check token every user should have token
const { checkToken } = require("./token_check")


// ======Show All Users==========
router.get('/users',checkToken,(req,res)=>{
    const q = "SELECT * FROM `users`"
    db.query(q,(error,data)=>{
        if(error) return res.send(error)
        return res.status(200).json(data)
    })
})
router.get("/users/:id",checkToken,(req,res)=>{
    const q = "SELECT * FROM `users` WHERE `user_id` = ? "
    const user_id = [req.params.id]
    db.query(q,user_id,(error,data)=>{
        if(error) return res.send(error);
        return res.status(200).json(data[0])
    })
})
// ===========Register user user must have token if you login you can take token============
router.post("/users",checkToken,(req,res)=>{
    const q = "INSERT INTO `users`( `user_email`, `user_password`, `user_phone`) VALUES (?)"
    const data = [req.body.email,req.body.password,req.body.phone]
    db.query(q,[data],(error,data)=>{
        if(error) return res.status(400).json(error)
        return res.status(200).json(data)
    })
})
// ==========Login Section With Using JSON WEB TOKEN for api===================
router.post("/login",(req,res)=>{
    const q = "SELECT * FROM `users` WHERE user_email = ? AND user_password = ?"
    db.query(q,[req.body.email,req.body.password],(error,data)=>{
        if(error){
            return res.send(error)
        }
        if(data){
            let result = (data[0].user_password==undefined)
            // Generate a JWT using the user ID as the payload
            const token = jwt.sign({ result: data }, "qwe1234", { expiresIn: '1h' });
            // Return the JWT to the client
            return res.json({ message:"Login Successfuly",token: token, data:data[0] });
        }
        else{
            return res.status(404).json({message:"User Dose Not Exist...."})
        }
    })
})

module.exports = router