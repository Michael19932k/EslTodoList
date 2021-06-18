const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 4000;
const path = require('path');

// App ~uses~
app.use(cors());
app.use(express.json());
app.use(express.static('build'))
mongoose.set('useFindAndModify', false);


//Exports
const todo = require('./schemas/todolist')


const mongoDBUrl = 'mongodb+srv://pucika2k:199313002k@cluster0.71gkv.mongodb.net/todolist?retryWrites=true&w=majority'
mongoose.connect(process.env.PORT.mongoDBUrl || mongoDBUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});


const getCurrentList = async (res) =>
    await todo.find({}, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });



app.get("/getInit", async (req, res) => {
    await todo.find({}, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
})


app.post("/addTodo", async (req, res) => {
    var newlist = new todo({
        text: req.body.todo.text,
        id: req.body.todo.id,
    });
    await newlist.save(function (err) {
        if (err) {
            console.error(err)
        } else {
            console.log(newlist)
        }
    });
    getCurrentList(res)
})

app.post("/removeTodo", async (req, res) => {
    console.log(req.body)
    await todo.findOneAndDelete({ id: req.body.id }, function (err) {
        if (err) console.log(err);
        console.log("Successful deletion");
    });
    getCurrentList(res)
})


app.post("/editTodo", async (req, res) => {
    console.log(req.body)
    await todo.findOneAndUpdate({ id: req.body.todoId }, { text: req.body.newValue.text }, {
        returnOriginal: false
    });
    getCurrentList(res)
});



if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}




app.listen(port, function () {
    console.log('server port', port)
})