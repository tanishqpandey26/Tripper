const express = require("express");
const router = express.Router();
const ItineraryModel = require ("../Models/Createitinerary");
const UserModel = require('../Models/User');
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


router.delete('/delete-itinerary/:id', ensureAuthenticated, async (req, res) => {
    try {
        const itineraryId = req.params.id;
        const userId = req.user._id;

        const itinerary = await ItineraryModel.findOneAndDelete({_id:itineraryId, user: userId});

        if(!itinerary){
            return res.status(404).json({message: "Itinerary not found or not authorised"});
        }

        res.status(200).json({message:"Itinerary deleted successfully"});
    }
    catch(error){
        res.status(400).json({message:"Error deleting itinerary",error});
    }
})


router.put ('/edit-itinerary/:id', ensureAuthenticated, async (req, res) => {
    try {
        const itineraryId =req.params.id;
        const {title, from, to ,remarks} =req.body;

        const updatedItinerary = await ItineraryModel.findByIdAndUpdate(
            itineraryId,
            {title,from,to,remarks},
            {new: true}
        );

        if(!updatedItinerary){
            return res.status(404).json({message:"Itinerary not found"});
        }

        res.status(200).json({
            message:"Itinerary updated successfully",
            itinerary : updatedItinerary
        });
    }
    catch (error){
        res.status(500).json({message:'Error updating itinerary', error});
    }
}
);

router.post('/share', ensureAuthenticated, async (req, res) => {
    const { itineraryId, recipientEmails } = req.body;
  
    try {
      const itinerary = await ItineraryModel.findById(itineraryId);
  
      if (!itinerary) {
        return res.status(404).json({ message: 'Itinerary not found' });
      }
  
      
      const recipients = await UserModel.find({ email: { $in: recipientEmails } });
  
      if (recipients.length === 0) {
        return res.status(404).json({ message: 'No recipients found' });
      }
  
     
      recipients.forEach(recipient => {
        if (!itinerary.sharedWith.includes(recipient._id)) {
          itinerary.sharedWith.push(recipient._id);
        }
      });
  
      await itinerary.save();
  
      res.status(200).json({ message: 'Itinerary shared successfully' });
    } catch (error) {
      console.error('Error sharing itinerary:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  router.get('/received', ensureAuthenticated, async (req, res) => {
    try {
      const userId = req.user.id; 
  
      const receivedItineraries = await ItineraryModel.find({ recipients: userId });
  
      res.json(receivedItineraries);
    } catch (error) {
      console.error('Error fetching received itineraries:', error);
      res.status(500).json({ message: 'Failed to fetch received itineraries' });
    }
  });

  
  router.delete('/received/:itineraryId', ensureAuthenticated, async (req, res) => {
    try {
        const userId = req.user._id;
        const { itineraryId } = req.params;

        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { receivedItineraries: itineraryId } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Itinerary deleted successfully', receivedItineraries: user.receivedItineraries });
    } catch (error) {
        console.error('Error deleting itinerary:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
  

module.exports = router;