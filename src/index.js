const express = require('express')
require('./db/mongoose') //runs the file to ensure mongoose connects to db 
const User = require('./models/user')
const Task = require('./models/task')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

//create new user
app.post('/users', (req, res)=>{
    const user = new User(req.body)

    user.save().then(()=>{
        res.send(user)
    }).catch((error)=>{
        res.status(400).send()
    })
})

//create new task
app.post('/tasks', (req, res) =>{
    const task = new Task(req.body)

    task.save().then(()=>{
        res.send(req.body)
    }).catch((e) =>{
        res.status(400).send()
    })
})

//get all users
app.get('/users', (req, res) => {
    User.find({}).then((users)=>{
        res.send(users)
    }).catch((e)=>{
        res.status(500).send()
    })
})

//get single user by ID
app.get('/users/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user)=>{
        if(!user){
            return res.status(404).send();
        }
        res.send(user)
    }).catch((e)=>{
        res.status(500).send()
    })
})

//get all tasks
app.get('/tasks', (req, res)=>{
    Task.find({}).then((tasks)=>{
        res.send(tasks)
    }).catch((e)=>{
        res.status(500).send()
    })
})

//get task by ID
app.get('/tasks/:id', (req, res)=>{
    const _id = req.params.id

    Task.findById(_id).then((task)=>{
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e)=>{
        res.status(404).send()
    })
})

app.listen(port, () =>{
    console.log('Server is up on port ' + port);
})