const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItinerarySchema = new Schema({

    title:{
        type:String,
        required:true,
    },

    from:{
        type:Date,
        required:true,
    },

    to: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value >= this.from;
            },
            message: 'The "to" date must be the same as or later than the "from" date.'
        }
    },

    remarks : {
        type:String,
        required:true,
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },

    sharedWith : [
        {
            type:Schema.Types.ObjectId,
            ref:'User',
        }
    ]
}) ;

const ItineraryModel = mongoose.model('itineraries',ItinerarySchema);

module.exports= ItineraryModel;