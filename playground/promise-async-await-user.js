require('../src/db/mongoose');
const User = require('../src/models/user')

// // promise chaining 
// User.findByIdAndUpdate("5fad3e2d82662c132acbf39a", { age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })


// async await
const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5facd9311f68a5236781aa84', 27).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})
