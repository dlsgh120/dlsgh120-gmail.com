const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const Users = require('../../models/users');

// @route POST api/auth
// @desc Auth user
// @ access private
router.post('/',(req,res)=>{
    const {userEmail, userPassword} = req.body;

    if(!userEmail || !userPassword){
        return res.status(400).json("정보를 입력하세요.");
    }

     Users.findOne({userEmail})
        .then(user => {
            if(!user) return  res.status(400).json("존재하지 않는 아이디 입니다.");

            bcrypt.compare(userPassword, user.userPassword)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json("패스워드가 틀립니다.");

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
                                    file:user.file,
                                    fileName:user.fileName
                                }
                            });
                        }
                    )

                })
        })
})

// @route GET api/auth/user
// @desc  get user data
// @ access private
router.get('/user',auth,(req,res)=>{
    Users.findById(req.user.id)
        .select('-userPassword')
        .then(user => res.json(user));
});

module.exports = router;