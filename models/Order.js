const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const OrderSchema = new Schema(
  {
    records: [
      {
        _id: false,
        recordID: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Record",
        },
        quantity: Number,
      },
    ],
    userID: { type: Schema.Types.ObjectId, required: true },
    paymentMethod: { type: String, default: "PayPal" },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

OrderSchema.virtual("TotalPrice").get(function () {
  // console.log('this is this', this.records);
  const totalPrice = this.records.reduce((acc, item) => {
    return (acc += item.recordID.price * item.quantity);
  }, 0);
  return totalPrice;
});

const Order = model("Order", OrderSchema);

module.exports = Order;
