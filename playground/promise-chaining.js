require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndRemove('611480aabaf7a368da63dbc9').then((deleted)=>{
//     console.log(deleted);
//     return Task.countDocuments({completed: false})
// }).then((notCompleted)=>{
//     console.log(notCompleted);
// }).catch((e)=>{
//     console.log(e);
// })

const deleteTaskAndCount = async(id, completed) => {
    const deletedTask = await Task.findByIdAndRemove(id)
    const countTasks = await Task.countDocuments({completed})

    return countTasks

}

deleteTaskAndCount('61146abebb71ed656d7b5af0', false).then((count)=>{
    console.log(count);
}).catch((e)=>{
    console.log(e);
})