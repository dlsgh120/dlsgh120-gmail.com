const Users = require('../models/users');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const multer =require('multer');
const upload = multer({dest:'./upload'}); 

exports.getUsers = async (req,res,next) =>{
    try {
        const users = await Users.find();
        return res.status(200).json({
            success:true,
            count: users.length,
            data:users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'server error'
        });
    }
}

exports.addUsers = async (req,res,next) =>{
    const {userName, userEmail, userPassword, formData, fileName} = req.body;
    console.log(req.body);
    if(!userName || !userEmail || !userPassword){
        return res.status(400).json('정보를 입력하세요');
    }

    await Users.findOne({userEmail})
        .then(user => {
            if(user) return  res.status(400).json('이미 가입된 아이디 입니다.');

            const newUser = new Users({
                userName,
                userEmail,
                userPassword,
                file:'test',
                fileName:'test'
            });

            bcrypt.genSalt(10,(err, salt) =>{
                bcrypt.hash(newUser.userPassword, salt, (err, hash) =>{
                    if(err) throw err;
                    newUser.userPassword = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                {id:user.id},
                                config.get('jwtSecret'),
                                {expiresIn: 3600},
                                (err, token) => {
                                    if(err) throw err;
                                        res.json({
                                            token,
                                            user:{
                                                id: user.id,
                                                userName: user.userName,
                                                userEmail: user.userEmail,
                                            }
                                        });
                                }
                            )
                        });
                })
            })
        })
}
