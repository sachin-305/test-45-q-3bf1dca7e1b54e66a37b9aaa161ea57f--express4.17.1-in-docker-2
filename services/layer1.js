const validatorfunctions = require("../utils/validator");
const leadApiModal = require("../modals/leadAPIModal");



const initilizeDB = async (leadId) => 
{
    try
    {
        leadApiModal.dbHandler.connect().then(response => {
            console.log('DB Connected');
        })
            .catch( error => console.log(error));
    }
    catch (e) 
    {
        console.log("ErrorSL1 initilizeDB \n");
        throw Error(e);
    }
}

initilizeDB();

const fetchLead = async (leadId) => 
{
    try
    {
        var retVal = {"statusCode": null, data: {reason: null, status: null}};
        var validationRes = await validatorfunctions.validateFetchLead({leadId: leadId});
        if (validationRes.isDataValid) 
        {
            retVal = await leadApiModal.getLead(leadId)
        } 
        else 
        {
            retVal.statusCode = 400;
            retVal.data.reason = validationRes.response.response.msg ;
            retVal.data.status = "failure" ;
        }
        return retVal;
    }
    catch (e) 
    {
        console.log("ErrorSL1 fetchLead \n");
        throw Error(e);
    }
}

const saveLead = async (reqData) => 
{
    try
    {
        var retVal = {"statusCode": null, data: {reason: null, status: null}};
        var validationRes = await validatorfunctions.validateSaveLead(reqData);
        if (validationRes.isDataValid) 
        {
            retVal = await leadApiModal.saveLead(reqData);
        } 
        else 
        {
            retVal.statusCode = 400;
            retVal.data.reason = validationRes.response.response.msg ;
            retVal.data.status = "failure" ;
        }
        return retVal;
    }
    catch (e) 
    {
        console.log("ErrorSL1 saveLead \n");
        throw Error(e);
    }
}

const updateLead = async (leadId,reqData) => 
{
    try
    {
        var retVal = {"statusCode": null, data: {reason: null, status: null}};
        let validationData = reqData;
        validationData.id =  leadId; 
        var validationRes = await validatorfunctions.validateUpdateLead(validationData);
        if (validationRes.isDataValid) 
        {
            retVal = await leadApiModal.updateLead(leadId,reqData);
        } 
        else 
        {
            retVal.statusCode = 400;
            retVal.data.reason = validationRes.response.response.msg ;
            retVal.data.status = "failure" ;
        }
        return retVal;
    }
    catch (e) 
    {
        console.log("ErrorSL1 updateLead \n");
        throw Error(e);
    }
}

const markLead = async (leadId,reqData) => 
{
    try
    {
        var retVal = {"statusCode": null, data: {reason: null, status: null}};
        let validationData = reqData;
        validationData.id =  leadId; 
        var validationRes = await validatorfunctions.validateMarkLead(validationData);
        if (validationRes.isDataValid) 
        {
            retVal = await leadApiModal.updateLead(leadId,reqData);
        } 
        else 
        {
            retVal.statusCode = 400;
            retVal.data.reason = validationRes.response.response.msg ;
            retVal.data.status = "failure" ;
        }
        return retVal;
    }
    catch (e) 
    {
        console.log("ErrorSL1 markLead \n");
        throw Error(e);
    }
}

const deleteLead = async (leadId) => 
{
    try
    {
        var retVal = {"statusCode": null, data: {reason: null, status: null}};
        var validationRes = await validatorfunctions.validateFetchLead({leadId: leadId});
        if (validationRes.isDataValid) 
        {
            retVal = await leadApiModal.deleteLead(leadId);
        } 
        else 
        {
            retVal.statusCode = 400;
            retVal.data.reason = validationRes.response.response.msg ;
            retVal.data.status = "failure" ;
        }
        return retVal;
    }
    catch (e) 
    {
        console.log("ErrorSL1 deleteLead \n");
        throw Error(e);
    }
}



module.exports = { fetchLead, saveLead, updateLead, deleteLead, markLead };