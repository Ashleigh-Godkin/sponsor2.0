let mongoose = require('mongoose');


/*const donations = [
    {id: 0000001, user: 'Joe', animal: 'cheetah', paymenttype: 'PayPal', amount: 20},
    {id: 0000002, user: 'Mary', animal: 'african giraffe',paymenttype: 'Direct', amount: 10},
    {id: 0000003, user: 'Bob', animal: 'asian elephant', paymenttype: 'Visa', amount: 50},
    {id: 0000004, user: 'Mark', animal: 'rhino', paymenttype: 'Visa', amount: 40},
    {id: 0000005, user: 'Sophie', animal: 'tiger', paymenttype: 'Direct', amount: 30}
];*/

let DonationSchema = new mongoose.Schema({
        user: String,
        animal: String,
        paymenttype: String,
        amount: {type: Number, default: 0},
    },
    { collection: 'sponsordb' });

module.exports = mongoose.model('Donation', DonationSchema);
//module.exports = donations;