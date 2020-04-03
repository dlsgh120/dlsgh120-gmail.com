const express = require('express');
const router = express.Router();

const Boards = require('../../models/boards');

router.get('/',(req,res) =>{
    Boards.find().sort({boardsDate:-1})
        .then(boards => res.json({boards:boards}));
});

// router.get('/:id',(req,res)=>{
//     const id = req.params.id;
//     Boards.findById(id).then(boards => res.json({boards:boards}));
// });

////////////////읽기
router.get('/:id',function(req,res){
        Boards.findById(req.params.id, function(err, boards){
            if(err){
               res.status(404).json({err});
            }
            else{
                res.json({boards:boards});
                Boards.findByIdAndUpdate(req.params.id,{$set:{view:boards.view+1}}, {upsert:true},function(err,boards){
                    if(err){
                        res.status(404).json({err});
                    }
                    else{
                        console.log('view++');
                    }
                });
            }
        });
});

// POST BOARDS
router.post('/',(req,res)=>{
    let a =0;
    Boards.find({},function(err,boards){
        if(err){
            console.log(err);
        }else{
            for(let i=0; i<boards.length;i++){
                if(a<boards[i].count){
                    a = boards[i].count;
                }
            }
        }
        Boards.create({
            userId:req.body.userId,
            userEmail: req.body.userEmail,
            userName: req.body.userName,
            count:a+1,
            title: req.body.title,
            content: req.body.content,
            view:0
        }).then(boards => res.status(201).json({boards}));
    });
   
});

//DELETE BOARDS
router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    Boards.findByIdAndDelete(id).then(boards=>res.json({boards}));
});

//Update Boards
router.post('/update/:id',(req,res)=>{
    const id = req.params.id;
    Boards.findByIdAndUpdate(id,{$set:{title:req.body.title, content:req.body.content}}, {upsert:true},function(err,boards){
        if(err){
            res.send(err);
        }
        else{
            res.json({boards});
        }
    });
});
module.exports = router;