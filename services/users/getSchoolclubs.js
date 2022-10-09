const club = require("../../models/club");
const clubModel = require("../../models/club");
const SchoolModel = require("../../models/school");
const getTeachers = require("../../utils/getClubTeacher");
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
   let _clubs = await clubModel.paginate(query, { page, limit });
   let result = [];
   //console.log(_clubs);
   for(const club of _clubs.docs){
      console.log(club)
      const teachers = await getTeachers(club._id,req);
      console.log(teachers)
      const tmp = {...club._doc,teachers};
      result.push(tmp);
   }
   _clubs.docs = result;

   res.send(_clubs);
};

module.exports = getSchoolClubs;
