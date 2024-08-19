const express = require("express");
const router = express.Router();
const ItineraryModel = require ("../Models/Createitinerary");
const ensureAuthenticated = require('../Middlewares/Auth');

router.post ('/create',ensureAuthenticated, async (req,res)=>{

    try{
        const {title, from, to, remarks}= req.body;
        const userId = req.user._id;

        const newItinerary = new ItineraryModel({
            title,
            from,
            to,
            remarks,
            user:userId
        });

        await newItinerary.save();

        res.status(201).json({
            message: "Itinerary created!", itinerary:newItinerary
    });
    }

    catch (error){
        res.status(500).json({message:'Error creating itinerary',error});
    }
});

router.get('/user-itineraries', ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.user._id; 
        const itineraries = await ItineraryModel.find({ user: userId });
        res.status(200).json({ itineraries });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching itineraries', error });
    }
});

module.exports = router;