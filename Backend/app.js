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
const rateLimit = require('express-rate-limit');
// ---routesimport end 

connectToDb();

// Custom CORS configuration
const allowedOrigins = ['https://pankajgusain.github.io' ,'http://localhost:3001']; // Replace with your allowed URL(s)
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'], // Allow only GET, POST, and OPTIONS
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow only specific headers
  credentials: true, // Enable cookies or authentication headers
};
// Define rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `windowMs`
  message: "Too many requests, please try again later.",
  headers: true, // Send rate limit info in headers
});


//middleware
app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
// Apply rate limiter to all routes
app.use(limiter);







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