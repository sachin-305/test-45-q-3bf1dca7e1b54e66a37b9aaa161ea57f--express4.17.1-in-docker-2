var express = require('express');

const sl1 = require("../services/layer1");

var router = express.Router();

/* GET Fetch Lead using Lead_Id */
router.get('/leads/:lead_id', function(req, res, next) {
        
    const leadId = req.params.lead_id;  
    sl1.fetchLead(leadId).then(response => {
        res.status(response.statusCode).send(response.data);
    })
        .catch( error => next(error));
});

/* GET Fetch Lead using Lead_Id */
router.post('/leads', function(req, res, next) {
        
    const reqData = req.body;  
    sl1.saveLead(reqData).then(response => {
        res.status(response.statusCode).send(response.data);
    })
        .catch( error => next(error));
});

/* PUT Update Lead using Lead_Id */
router.put('/leads/:lead_id', function(req, res, next) {
        
    const leadId = req.params.lead_id;  const reqData = req.body;
    sl1.updateLead(leadId,reqData).then(response => {
        res.status(response.statusCode).send(response.data);
    })
        .catch( error => next(error));
});

/* DELETE Delete Lead using Lead_Id */
router.delete('/leads/:lead_id', function(req, res, next) {
        
    const leadId = req.params.lead_id;
    sl1.deleteLead(leadId).then(response => {
        res.status(response.statusCode).send(response.data);
    })
        .catch( error => next(error));
});

/* PUT Update Lead using Lead_Id */
router.put('/mark_lead/:lead_id', function(req, res, next) {
        
    const leadId = req.params.lead_id;  const reqData = req.body;
    sl1.markLead(leadId,reqData).then(response => {
        res.status(response.statusCode).send(response.data);
    })
        .catch( error => next(error));
});

module.exports = router;
