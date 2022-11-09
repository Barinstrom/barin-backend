const schoolModel = require("../../../models/school");
//const { PaginationParameters } = require('mongoose-paginate-v2');

const getApprovedSchool = (req, res) => {
   let tmp = "(^.*$)";
   if (req.query.query)
      tmp = new RegExp("(" + req.query.query + ")");
   const query = {
      schoolName: {
         $regex: tmp,
         $options: "i"
      },
      status: "approve",
      paymentStatus: "success",
   };
   const page = req.query.page || 1;
   const limit = 10;
   const sort = "field -paymentDate";

   //{ color: "blue", published: true }, { page: 1, limit: 10, projection: { color: 1 } }
   schoolModel
      .paginate(query, {
         page,
         limit,
         sort
      })
      .then((result) => {
         res.send(result);
      })
      .catch((err) => {
         res.json({
            success: false,
            message: "update email or password fail"
         });
         res.status(400).send("paginate error");
      });
};

module.exports = getApprovedSchool;