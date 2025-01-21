const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware.js');
const mapController = require('../controllers/map.controller.js');
const {query} = require('express-validator');


// fetch address co-ordinate
router.get('/get-coordinates',
    query('address').isString().isLength({min: 3}),
    authMiddleware.authUser ,
    mapController.getCoordinates);

// to fetch the distance between two points and time
router.get('/get-distance-time',
    query('origin').isString().isLength({min: 3}),
    query('destination').isString().isLength({min: 3}),
    authMiddleware.authUser ,
    mapController.getDistanceTime
)

// to fetch suggestions 
router.get('/get-suggestions',
    query('address').isString().isLength({min: 3}),
    authMiddleware.authUser ,
    mapController.getAutoCompleteSuggestions
)


module.exports = router;