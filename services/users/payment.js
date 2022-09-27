const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const SchoolModel = require("../../models/school");
const payment = async (req, res) => {
   console.log("schoolname", req.userInfo.schoolID);
   const school = await SchoolModel.findOne({
      schoolID: req.userInfo.schoolID,
   }).exec();
   if (school.paymentStatus == "success") {
      return res
         .status(200)
         .json({ success: false, message: "You had already paid." });
   }

   // verify paymentIntent
   const paymentIntent = await stripe.paymentIntents.retrieve(
      school.paymentIntentId
   );
   const status = paymentIntent.status;
   if (status == "succeeded") {
      let paymentDate = new Date();
      await school.updateOne({
         paymentStatus: "success",
         paymentDate: paymentDate,
      });
      return res.status(200).json({ success: true });
   } else if (status == "processing") {
      return res.status(200).json({ success: false, message: "processing" });
   } else if (status == "requires_payment_method") {
      return res.status(200).json({ success: false, message: "not success" });
   } else {
      return res
         .status(200)
         .json({ success: false, message: "something went wrong" });
   }
};

module.exports = payment;
