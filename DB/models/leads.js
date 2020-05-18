const mongoose = require("mongoose");

/**
 * Leads model schema.
 */

const leadsSchema = new mongoose.Schema({
    leadId: {
        type: Number,
        unique: true,
        required: true
    },
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: Number,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    location_type: {
        type: String,
        enum: ["Country", "City","Zip"],
        required: true
    },
    location_string: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["Created", "Contacted"],
        required: true
    },
    communication: {
        type: String,
        trim: true
    }
}, { versionKey: false });

module.exports = mongoose.model("leads", leadsSchema);
