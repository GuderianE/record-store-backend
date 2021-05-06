const mongoose = require('mongoose');
const {model, Schema} = mongoose;


const BasketSchema = new Schema({
    records: [
        {_id: false, recordID:
            { 
            type: Schema.Types.ObjectId, 
            required: true,
            ref: "Record",
            }, 
            quantity: Number
        }],
    userID: {type: Schema.Types.ObjectId, required: true},
}, {
    versionKey: false,
    timestamps: true
});

BasketSchema.virtual('TotalPrice').get(function() {
    return this.records.reducer((acc, item) => {
        if (item.price) {
            acc += item.price;
        }
        return acc;
    }, 0)

})

const Basket = model('Basket', BasketSchema);

module.exports = Basket;