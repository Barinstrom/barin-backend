const schoolModel = require("../../../models/school");
//const { PaginationParameters } = require('mongoose-paginate-v2');

const getPendingSchool = (req, res) => {
   let tmp = "(?!^all$)(^.*$)";
   if (req.query.query)
      tmp = new RegExp("(?!^all$)" + "(" + req.query.query + ")");
   const query = {
      schoolID: { $regex: tmp, $options: "i" },
      status: "pending",
      paymentStatus: "success",
   };
   const page = req.query.page || 1;
   const limit = 3;
   const sort = "field paymentDate";

   //{ color: "blue", published: true }, { page: 1, limit: 10, projection: { color: 1 } }
   schoolModel
      .paginate(query, { page, limit, sort })
      .then((result) => {
         res.send(result);
      })
      .catch((err) => {
         res.status(400).send("paginate error");
      });
};

module.exports = getPendingSchool;
