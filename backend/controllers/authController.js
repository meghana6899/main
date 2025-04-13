const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const {secret, expiresIn} = require('../configdb/jwtConfig.js');



const login = async(req,res) => {
    const {email, password, role} = req.body;
    console.log(email)
   
    

    userModel.findUser(email,role, async(err, user) => {
        if(err) return res.status(500).json({
            success: false,
            msg: 'DB error'
        });

        if(!user) return res.status(401).json({
            success: false,
            msg : 'User not found'
        });
       //console.log(user)
        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) return res.status(401).json({
            success: false,
            msg: 'Invalid password'
        });

        console.log(user.role)
        if(!user.role){
            user.role = "student"
        }
        const token = jwt.sign({userId : user.id, role: user.role}, secret, {expiresIn});
        console.log('Now: ', token)
        res.json({ success: true, token, role: user.role});
    })
}

module.exports = {login}


