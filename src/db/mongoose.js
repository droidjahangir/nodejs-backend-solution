const mongoose = require('mongoose')
// const { MongoClient } = require("mongodb");

mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})


// // Optional. Use this if you create a lot of connections and don't want
// // to copy/paste `{ useNewUrlParser: true }`.
// mongoose.set('useNewUrlParser', true);
