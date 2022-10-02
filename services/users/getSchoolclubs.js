const clubModel = require("../../models/club");
const SchoolModel = require("../../models/school");
//const { PaginationParameters } = require('mongoose-paginate-v2');

const getSchoolClubs = async (req, res) => {
   _school = await SchoolModel.findOne({schoolID: req.userInfo.schoolID}).exec();
   let tmp = "";
   if (req.query.query) tmp = new RegExp("^" + req.query.query);
   const query = {
      clubName: { $regex: tmp, $options: "i" },
      schoolID: req.userInfo.schoolID,
      schoolYear: _school.nowSchoolYear,
   };
   const page = req.query.page || 1;
   const limit = 3;

   //{ color: "blue", published: true }, { page: 1, limit: 10, projection: { color: 1 } }
   clubModel
      .paginate(query, { page, limit })
      .then((result) => {
         res.send(result);
      })
      .catch((err) => {
         res.status(400).send("paginate error");
      });
};

module.exports = getSchoolClubs;
