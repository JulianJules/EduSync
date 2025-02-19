const mongoose = require("mongoose");


const plannerSchema = new mongoose.Schema({
    user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true },    

    planner: [
        {
            day: {
                type: Number,
                required: true,
                min: 0,
                max: 6
            },
            tasks: [
                {
                    subject: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
    ],
})




  module.exports = mongoose.model("Planner", plannerSchema);
