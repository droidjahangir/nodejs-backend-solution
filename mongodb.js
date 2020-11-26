// CRUD - create, read, update, delete

// const mongodb = require('mongodb')
// const MongodbClient = mongodb.MongoClient

// destructuring
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new mongodb.ObjectID()


// CREATE or insertion operation
// MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
//     if(error) {
//         return console.log('Unable to connect to database!')
//     }
    
//     const db = client.db(databaseName)

//     // db.collection('users').insertOne({
//     //     name: 'Jahangir',
//     //     age: 27
//     // })

//     // db.collection('users').insertOne({
//     //     name: 'john',
//     //     age: 22
//     // }, (error, result) => {
//     //     if (error) {
//     //         return console.log('Unable to insert user')
//     //     }
//     //     console.log(result.ops)
//     // })

//     db.collection('users').insertMany([
//         {
//             name: 'Jen',
//             age: 28
//         }, {
//             name: 'Gunther',
//             age: 27
//         }
//     ], (error, result) => {
//         if (error) {
//             return console.log('Unable to insert documents !')
//         }
//         console.log(result.ops)
//     })

//     // another collection
//     db.collection('tasks').insertMany([
//         {
//             description: 'Clean the house',
//             completed: true
//         }, {
//             description: 'Renew inspection',
//             completed: false
//         }, {
//             description: 'pot plants',
//             completed: false
//         }
//     ], (error, result) => {
//         if (error) {
//             return console.log('Unable to insert tasks !')
//         }

//         console.log(result.ops)
//     })
// })




// // READ operation
// MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
//     if(error) {
//         return console.log('Unable to connect to database!')
//     }
    
//     const db = client.db(databaseName)

//     // db.collection('users').findOne({ name: 'Jen' }, (error, user) => {
//     //     if (error) {
//     //         return console.log('Unable to fetch ')
//     //     }

//     //     console.log(user)
//     // })  


//     // find by id
//     db.collection('users').findOne({ _id: new ObjectID("5fa8b97dd11cf8196fa81c1b") }, (error, user) => {
//         if (error) {
//             return console.log('Unable to fetch')
//         }
//         console.log(user)
//     })

//     // find multiple item
//     db.collection('users').find({ age: 27 }).toArray((error, users) => {
//         console.log(users)
//     })

//     // count all item
//     db.collection('users').find({ age: 27 }).toArray((error, users) => {
//         console.log(users)
//     })
// })




// // UPDATE operation
// MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
//     if (error) {
//         return console.log('Unable to connect to database!')
//     }

//     const db = client.db(databaseName)

//     // updateOne()
//     db.collection('users').updateOne({
//         _id: new ObjectID("5fa8b97dd11cf8196fa81c1b")
//     }, {
//         $set: {
//             name: 'Imran'
//         }
//     }).then((result) => {
//         console.log(result)
//     }).catch((error) => {
//         console.log(error)
//     })

//     // updateMany()
//     // db.collection('tasks').updateMany({
//     //     completed: false
//     // }, {
//     //     $set: {
//     //         completed: true
//     //     }
//     // }).then((result) => {
//     //     console.log(result.modifiedCount)
//     // }).catch((error) => {
//     //     console.log(error)
//     // })
// })





// DELETE operation
MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    db.collection('users').deleteMany({
        age: 27
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

})
