const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router()


// // CREATE operation

// // promise
// app.post('/users', (req, res) => {

//     // // Dump this object into terminal
//     // console.log(res.body)
//     const user = new User(req.body)

//     user.save().then(() => {
//         res.status(201).send(user)
//     }).catch((e) => {
//         res.status(400).send(e)
//         // res.send(e)
//     })
// })

// async-await
router.post('/users', async (req, res) => {

    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})


// // READ operation

// // promises
// app.get('/users', (req, res) => {
//     User.find({}).then((users) => {
//         res.send(users)
//     }).catch((e) => {
//         res.status(500).send()
//     })
// })


// async-await
router.get('/users', auth , async (req, res) => {

    // res.send(req.user)
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})


// Get user profile
router.get('/users/me', auth , async (req, res) => {

    res.send(req.user)
})


const upload = multer({
    // dest: 'avaters',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

// upload file
router.post('/users/me/avater', auth, upload.single('avater'), async(req, res) => {
    
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avater = buffer

    // req.user.avater = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})


// delete user image
router.delete('/users/me/avater', auth, async (req, res) => {

    try {
        req.user.avater = undefined
        await req.user.save()
        res.send()
    } catch (e) {
        console.log(e)
    }
    
})


// serving up image
router.get('/users/:id/avater', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avater) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avater)

    } catch (e) {
        console.log(e)
    }
})


// login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        
        // res.send({ user: user.getPublicProfile() })
        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})


// Logout with particular token
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})
// {{url}}/users/me       -> read user
// {{url}}/users/logout   -> logout
// {{url}}/users/login    -> login


// Logout all token
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})



// // promises
// app.get('/user/:id', (req, res) => {
//     const _id = req.params.id

//     User.findById(_id).then((user) => {
//         if (!user) {
//             return res.status(404).send()
//         }

//         res.send(user)
//     }).catch((e) => {
//         res.status(500).send()
//     })
// })

// async-await
router.get('/user/:id', async (req, res) => {

    try {
        const _id = req.params.id

        if (!user) {
            return res.status(400).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})


// UPDATE operation
router.patch('/users/me', auth,  async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updated !' })
    }

    try {
        // const user = await User.findById(req.params.id)

        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()

        // if (!user) {
        //     return res.status(404).send()
        // }

        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})


// DELETE operation
router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.params.id)

        // if (!user) {
        //     return res.status(404).send()
        // }
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router