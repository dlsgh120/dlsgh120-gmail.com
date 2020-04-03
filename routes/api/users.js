const express = require('express');
const router = express.Router();
const Users = require('../../models/users');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer = require('multer');
// const upload= multer({dest:'./upload'});
let storage = multer.diskStorage({
    destination: function(req, file ,callback){
        callback(null, "./client/public/upload/")
    },
    filename: function(req, file, callback){
        callback(null,Date.now()+'-'+file.originalname)
    }
})

// 1. multer 미들웨어 등록
let upload = multer({
    storage: storage
})

router.get('/',(req,res)=>{
    Users.find().sort({userDate:-1}).then(users=> res.status(200).json({users}));
});

router.post('/',upload.single('file'),async (req,res)=>{
    // const {userName, userEmail, userPassword, file, fileName} = req.body;
    const {userEmail, userName, userPassword} = req.body;
   
    await Users.findOne({userEmail}).then(user =>{
        if(user) return res.status(400).json('이미 가입된 아이디 입니다.');

        const newUser = new Users({
           userName,
           userEmail,
           userPassword,
            file: req.file?'./upload/'+req.file.filename:'',
            fileName: req.file?req.file.filename:''
        });
        bcrypt.genSalt(10,(err,salt) =>{
            bcrypt.hash(newUser.userPassword, salt, (err,hash)=>{
                if(err) throw err;
                newUser.userPassword = hash;
                newUser.save()
                    .then(user =>{
                        jwt.sign(
                            {id:user.id},
                            config.get('jwtSecret'),
                            {expiresIn:3600},
                            (err, token) =>{
                                if(err) throw err;
                                res.json({
                                    token,
                                    user:{
                                        id:user.id,
                                        userName:user.userName,
                                        userEmail: user.userEmail,
                                        file: user.file,
                                        fileName: user.fileName
                                    }
                                })
                            }
                        )
                    })
            })
        })
    })
})

router.post('/profile/:id',upload.single('file'),(req,res) =>{
    const id = req.params.id;
    Users.findByIdAndUpdate(id,{$set:{file:req.file?'./upload/'+req.file.filename:'', fileName:req.file?req.file.filename:''}}, {upsert:true})
    .then(user =>{
        jwt.sign(
            {id:user.id},
            config.get('jwtSecret'),
            {expiresIn:3600},
            (err) =>{
                if(err) throw err;
                res.json({
                    user:{
                        id:user.id,
                        userName:user.userName,
                        userEmail: user.userEmail,
                        file: user.file,
                        fileName: user.fileName
                    }
                })
            }
        )
    })
})

router.get('/reload/:id',(req,res)=>{
    Users.findById(req.params.id).then(user=>res.json({user:{
        id:user.id,
        userName:user.userName,
        userEmail: user.userEmail,
        file: user.file,
        fileName: user.fileName
    }}));
})

module.exports = router;