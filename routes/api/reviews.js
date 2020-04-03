const express = require('express');
const router =express.Router();

const Reviews = require('../../models/review');

router.get('/',(req,res)=>{
    Reviews.find({}).then(reviews => res.status(200).json({reviews}));
});

router.post('/',(req,res)=>{
    Reviews.create({
        userId:req.body.userId,
        boardId:req.body.boardId,
        content:req.body.content,
        userName:req.body.userName
    }).then(reviews => res.status(201).json({reviews}));
});

// board를 read할때 boardId에 대한 모든 review 출력
router.get('/boardId/:id',(req,res)=>{
    const id = req.params.id;
    Reviews.find({'boardId':id}).sort({date:-1}).then(reviews => res.json({reviews}));
});

//board를 delete 할때 boardId에 대한 모든 review 삭제
router.delete('/boardId/:id',(req,res)=>{
    const id = req.params.id;
    Reviews.deleteMany({'boardId':req.params.id}).then(review=> res.json({review}));
});

router.delete('/:id',(req,res)=>{
    const id = req.params.id;
    Reviews.findByIdAndDelete(id).then(reviews=>res.json({reviews}));
});
module.exports = router;