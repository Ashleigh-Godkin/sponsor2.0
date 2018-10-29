let donations = require('../models/donations');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Donation = require('../models/donations');
//let uriUtil = require('mongodb-uri');

var mongodbUri ='mongodb://sponsordb:SPONSORDB1@ds145083.mlab.com:45083/sponsordb';

mongoose.connect(mongodbUri,  { useNewUrlParser: true });
let db = mongoose.connection;


db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});


db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Donation.find(function(err, donations) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(donations,null,5));
    });
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Donation.find({ "_id" : req.params.id },function(err, donation) {
        if (err)
            res.json({ message: 'Donation NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(donation,null,5));
    });
}

/*function getByValue(array, id) {
    var result  = array.filter(function(obj){return obj.id == id;} );
    return result ? result[0] : null; // or undefined
}*/

function getTotalAmount(array) {
    let totalAmount = 0;
    array.forEach(function(obj) { totalAmount += obj.amount; });
    return totalAmount;
}

router.addDonation = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var donation = new Donation();

    donation.user = req.body.user;
    donation.animal = req.body.animal;
    donation.paymenttype = req.body.paymenttype;
    donation.amount = req.body.amount;

    donation.save(function(err) {
        if (err)
            res.json({ message: 'Donation NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Donation Successfully Added!', data: donation });
    });
}



router.deleteDonation = (req, res) => {

    Donation.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Donation NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Donation Successfully Deleted!'});
    });
}

router.incrementAmount = (req, res) => {

    Donation.findById(req.params.id, function(err,donation) {
        if (err)
            res.json({ message: 'Donation NOT Found!', errmsg : err } );
        else {
            donation.amount += 10;
            donation.save(function (err) {
                if (err)
                    res.json({ message: 'Donation NOT UpVoted!', errmsg : err } );
                else
                    res.json({ message: 'Donation Successfully Upvoted!', data: donation });
            });
        }
    });
}

router.findTotalAmount = (req, res) => {

    Donation.find(function(err, donations) {
        if (err)
            res.send(err);
        else
            res.json({ totalamount: getTotalAmount(donations) });
    });
}





module.exports = router;