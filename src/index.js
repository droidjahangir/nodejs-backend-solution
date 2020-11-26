const express = require('express')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT
// const port = process.env.PORT || 3000



// // File upload
// const multer = require('multer')
// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.endsWith('.pdf')) {
//             return cb(new Error('Please upload a PDF'))
//         }
//         // if (!file.originalname.match(/\.(doc|docx)$/)) {
//         //     return cb(new Error('Please upload a PDF'))
//         // }
//         cb(undefined, true)

//         // cb(new Error('File must be a PDF'))
//         // cb(undefined, true)
//         // cb(undefined, false)
//     }
// })

// app.post('/upload', upload.single('document'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message })
// })


// app.use((req, res, next) => {
//     console.log(req.method, req.path)
//     next()
// })

// app.use((req, res, next) => {
//     if ( req.method === 'GET') {
//         res.send('GET requests are desabled')
//     } else {
//         next()
//     }

//     // res.status(503).send('Site is currently down. Check back soon !')
// })

// convert JSON data into js object which is from front end  
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


// // Route
// const router = new express.Router()
// router.get('/test', (req, res) => {
//     res.send('This is from my other router')
// })
// app.use(router)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})



// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'iamastudent', { expiresIn: '7 days' })
//     console.log(token)

//     const data = jwt.verify(token, 'iamastudent')
//     console.log(data)
// }

// myFunction()


// // relationship
// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
    
//     try{
//         // // for task
//         // const task = await Task.findById('5fbb21127f9d381748aabe6e')
//         // await task.populate('owner').execPopulate()
//         // console.log(task.owner)

//         // for user
//         const user = await User.findById('5fbb6464eb9375166846cda9')
//         await user.populate('tasks').execPopulate()
//         console.log(user.tasks)
//     }catch (e) {
//         console.log(e)
//     }
    
// }

// main()