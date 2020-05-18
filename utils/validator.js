"use strict";

const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)



const isValidObject = async (incomingObj,schema) => 
{
    try 
    {
        var retVal = {isValid : true, msg : '' };
        await schema.validateAsync(incomingObj).catch((err) => {
            retVal.isValid = false;
            retVal.msg = err.details[0].message ;
        });
        return retVal;
    }
    catch (e) 
    { 
        console.log("Error isValidObject  \n");
        throw Error(e);
    }
}

const validateFetchLead = async (incomingObj) => 
{
    try 
    {
        var retVal = { isDataValid : true, response : {response : {msg : '' } , isMethodSuccessfullyExecuted : false } };
        const schema = Joi.object({
            "leadId": Joi.number().required()
        });
        var resValidator = await isValidObject(incomingObj,schema);
        if(! resValidator.isValid)
        {
            retVal.isDataValid = false;
            retVal.response.response.msg = resValidator.msg ;
        }
        return retVal;
    }
    catch (e) 
    { 
        console.log("Error validateFetchLead  \n");
        throw Error(e);
    }
}

const validateSaveLead = async (incomingObj) => 
{
    try 
    {
        var retVal = { isDataValid : true, response : {response : {msg : '' } , isMethodSuccessfullyExecuted : false } };
        const schema = Joi.object({
            "first_name": Joi.string().required(),
            "last_name": Joi.string().required(),
            "mobile": Joi.number().required().min(1000000000).max(9999999999),
            "email": Joi.string().email().required(),
            "location_type": Joi.any().valid( "Country", "City","Zip" ),
            "location_string": Joi.string().required()
        });
        var resValidator = await isValidObject(incomingObj,schema);
        if(! resValidator.isValid)
        {
            retVal.isDataValid = false;
            retVal.response.response.msg = resValidator.msg ;
        }
        return retVal;
    }
    catch (e) 
    { 
        console.log("Error validateSaveLead  \n");
        throw Error(e);
    }
}

const validateUpdateLead = async (incomingObj) => 
{
    try 
    {
        var retVal = { isDataValid : true, response : {response : {msg : '' } , isMethodSuccessfullyExecuted : false } };
        const schema = Joi.object({
            "first_name": Joi.string().required(),
            "last_name": Joi.string().required(),
            "mobile": Joi.number().required().min(1000000000).max(9999999999),
            "id": Joi.number().required(),
            "email": Joi.string().email().required(),
            "location_type": Joi.any().valid( "Country", "City","Zip" ),
            "location_string": Joi.string().required()
        });
        var resValidator = await isValidObject(incomingObj,schema);
        if(! resValidator.isValid)
        {
            retVal.isDataValid = false;
            retVal.response.response.msg = resValidator.msg ;
        }
        return retVal;
    }
    catch (e) 
    { 
        console.log("Error validateUpdateLead  \n");
        throw Error(e);
    }
}

const validateMarkLead = async (incomingObj) => 
{
    try 
    {
        var retVal = { isDataValid : true, response : {response : {msg : '' } , isMethodSuccessfullyExecuted : false } };
        const schema = Joi.object({
            "communication": Joi.string().required(),
            "id": Joi.number().required()
        });
        var resValidator = await isValidObject(incomingObj,schema);
        if(! resValidator.isValid)
        {
            retVal.isDataValid = false;
            retVal.response.response.msg = resValidator.msg ;
        }
        return retVal;
    }
    catch (e) 
    { 
        console.log("Error validateMarkLead  \n");
        throw Error(e);
    }
}

module.exports = { validateFetchLead, validateSaveLead, validateUpdateLead, validateMarkLead };
