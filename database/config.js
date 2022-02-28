const mongoose = require("mongoose")
const url = "mongodb+srv://sampath:passwords@cluster0.w3bhu.mongodb.net/survey_app?retryWrites=true&w=majority"
mongoose.connect(url,({useNewUrlParser: true,useUnifiedTopology: true}))

const con = mongoose.connection

con.on('open', (err) => {
    if (err) {
        console.log(err)
    }
    console.log('connected succesfully to MongoDB Atlas');
})

module.exports = con;