const mongoose = require('mongoose')

 
const URL = process.env.MONGODB_URI
const dbConnect = () => {
    mongoose.connect(URL)
        .then(() => {
            console.log('DB Connected')
        }).catch(() => {
            console.log('connection problem in DB')
        })
}

module.exports = dbConnect