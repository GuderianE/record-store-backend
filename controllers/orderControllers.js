const Order = require("../models/Order");

exports.addRecord = async (req, res, next) => {
  const addedRecord = req.body;
  const { userID } = req.params;
  console.log("addedRecord", addedRecord);
  try {
    const orderNew = await Order.create({
      records: addedRecord,
      userID,
    });
    console.log("orderNew", orderNew);

    const populate = await Order.find({ _id: orderNew._id }).populate(
      "records.recordID"
    );
    console.log("populate", populate);
    res.json(populate);
  } catch (err) {
    next(err); // forward error to central error handler
  }
};

exports.getPreOrders = async (req, res, next) => {
  const { userID } = req.params;

  try {
    const preOrders = await Order.find({ userID }).populate("records.recordID");
    console.log("preorders", preOrders);
    res.json(preOrders);
  } catch (err) {
    next(err);
  }
};

exports.deleteAllRecords = async (req, res, next) => {
  const deletedRecords = await Order.deleteMany();
  res.send(deletedRecords);
};
