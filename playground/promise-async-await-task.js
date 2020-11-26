require('../src/db/mongoose');
const Task = require('../src/models/task');


// // promise chaining
// Task.findByIdAndDelete('5fab7d26364c4a1e31d32f98').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


// async-await
const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false })

    return count
}

deleteTaskAndCount('5fab7d26364c4a1e31d32f98').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
