const express = require('express');
const mongoose =require('mongoose');
const bodyParser = require('body-parser');
const config = require('config');
const path = require('path');

// mongoose.set('useFindAndModify', false);


const db = config.get('mongoURI');

mongoose.connect(db,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}) .then(()=> console.log("mongoDB connected..."))
    .catch(err => console.log(err));

const todos = require('./routes/api/todos');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const boards = require('./routes/api/boards');
const reviews = require('./routes/api/reviews');

const app = express();

//BodyParser Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
 // Use Routes

 app.use('/file',express.static('./upload'));

 app.use('/api/todos',todos);

 // users Routes
 app.use('/api/users',users);

 app.use('/api/auth', auth);

 ///boards routes
 app.use('/api/boards',boards);
 
 //reviews routes
 app.use('/api/reviews',reviews);

//
if(process.env.NODE_ENV ==='production' ){
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000; 

app.listen(port,()=>console.log(`Server started on port ${port}`));
