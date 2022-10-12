// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const SchoolModel = require("../../models/school");
const calculateOrderAmount = (items) => {
   // Replace this constant with a calculation of the order's amount
   // Calculate the order total on the server to prevent
   // people from directly manipulating the amount on the client
   return 500000;
};

const getIntent = async (req, res) => {
   const { items } = req.body;
   const school = await SchoolModel.findOne({
      schoolID: req.userInfo.schoolID,
   }).exec();
   if (school.paymentStatus == "success") {
      return res
         .status(400)
         .json({ success: false, message: "You had already paid." });
   }
   // Create a PaymentIntent with the order amount and currency
   const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "thb",
      // automatic_payment_methods: {
      //   enabled: false,
      // },
      payment_method_types: ["promptpay"],
   });
   const updated = await school.updateOne({
      paymentIntentId: paymentIntent.id,
   });

   res.send({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
   });
};

module.exports = getIntent;
