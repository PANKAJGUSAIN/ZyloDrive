const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');

// ---routesimport start
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/map.routes');
const RideRoutes = require('./routes/ride.routes');
// ---routesimport end 

connectToDb();

//middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())


//routes
app.get('/', (req,res)=>{
    res.send('Hello world');
})

app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
app.use('/maps',mapsRoutes);
app.use('/rides',RideRoutes);
//routes end

module.exports = app;