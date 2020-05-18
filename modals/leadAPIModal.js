const mongoose = require('mongoose');
const moment = require("moment-timezone");

const dbHandler = require('../DB/db-handler');
const Leads = require('../DB/models/leads');




const getLead = async (leadId) => 
{
    try
    {
        var retVal = {"statusCode": 404, data: {}};
        var lead = await Leads.findOne({ leadId: leadId },'-_id -leadId');
        if(lead)
        {   
            retVal.statusCode = 200;
            retVal.data =  lead   
        }
        return retVal;
    }
    catch (e) 
    {
        console.log("Error getLead \n");
        throw Error(e);
    }
}

const saveLead = async (reqData) => 
{
    try
    {
        var retVal = {"statusCode": 400, data: {reason: null, status: null}};
        var leadId = moment().tz("Asia/Kolkata").format("YYYYMMDDHHmmss");
        const lead = new Leads({
            leadId: leadId ,
            first_name: reqData.first_name ,
            last_name:  reqData.last_name ? reqData.last_name : '' ,
            mobile: reqData.mobile  ,
            email: reqData.email ,
            location_type: reqData.location_type ,
            location_string: reqData.location_string ? reqData.location_string : ''  ,
            status: "Created"
        });
        var saved = await lead.save()
        .catch( error => {
            retVal.data.reason = error.errmsg;
            retVal.data.status = "failure";
        });
        if(saved)
        {
            let temp = reqData;
            temp.id = saved.leadId;
            temp.status = saved.status;
            retVal.statusCode = 201;
            retVal.data = temp;
        }
        return retVal;
    }
    catch (e) 
    {
        console.log("Error saveLead \n");
        throw Error(e);
    }
}


const updateLead = async (leadId,reqData) => 
{
    try
    {
        var retVal = {"statusCode": 404, data: {reason: "Id not found", status: "failure"}};
        var query = { leadId: leadId };
        if(reqData.communication && reqData.communication.length > 0 )
            reqData.status = "Contacted";
        
        var updated = await Leads.findOneAndUpdate(query, reqData, {new: true})
        .catch( error => {
            retVal.data.reason = error.errmsg;
            retVal.data.status = "failure";
        });
        if(updated)
        {
            retVal.statusCode = 202;
            retVal.data.status = "success";
            delete retVal.data.reason;
            if(reqData.communication && reqData.communication.length > 0 )
            {
                let temp = {status: "Contacted", communication: updated.communication};
                retVal.data = temp;
            }
        }
        return retVal;
    }
    catch (e) 
    {
        console.log("Error updateLead \n");
        throw Error(e);
    }
}

const deleteLead = async (leadId) => 
{
    try
    {
        var retVal = {"statusCode": 204, data: {reason: "Id not found", status: "failure"}};
        var query = { leadId: leadId };
        var deleted = await Leads.findOneAndDelete(query)
        .catch( error => {
            retVal.data.reason = error.errmsg;
            retVal.data.status = "failure";
        });
        if(deleted)
        {
            retVal.statusCode = 200;
            retVal.data.status = "success";
            delete retVal.data.reason;
        }
        return retVal;
    }
    catch (e) 
    {
        console.log("Error deleteLead \n");
        throw Error(e);
    }
}


module.exports = { getLead, dbHandler, saveLead, updateLead, deleteLead };