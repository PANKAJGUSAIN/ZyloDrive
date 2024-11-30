const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect(process.env.DB_CONNECT,{ 
        //useNewUrlParser: true, //doesnot require anymore as it is enabled by default
        //useUnifiedTopology: true //doesnot require anymore as it is enabled by default
    }).then(() => {
        console.log('Connected to DB');
    }).catch(err => console.log(err))
}

module.exports = connectToDb;