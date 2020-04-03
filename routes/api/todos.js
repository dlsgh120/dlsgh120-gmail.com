const express = require('express');
const router = express.Router();


const Todos = require('../../models/todos');

router.get('/',(req,res)=>{
    Todos.find().sort({date:-1}).then(todos => res.status(200).json({todos}));
});

router.post('/',(req,res)=>{
    Todos.create({userId:req.body.userId,name:req.body.name}).then(todos=>res.status(201).json({todos}));
});

router.get('/delete/:id',(req,res)=>{
    Todos.findByIdAndDelete(req.params.id).then(todos=>res.json({todos}));
});

router.get('/userId/:id',(req,res)=>{
    const id = req.params.id;
    Todos.find({'userId':id}).sort({date:-1}).then(todos => res.status(200).json({todos}));
});
module.exports = router;