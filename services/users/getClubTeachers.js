const teacherModel = require("../../models/teacher");
const clubModel = require("../../models/club");
const userModel = require("../../models/user");


const getClubTeachers = async (req, res) => {

   //หา club ที่จะดูรีวิว
   const tmpClub = await clubModel.findById(req.query.clubID);
   if (!tmpClub)
      return res.status(400).send({ error: "This club doesn't exist." });
   const club = await clubModel.findOne({ groupID: tmpClub.groupID, schoolYear: req.query.schoolYear });
   if (!club)
      return res.status(400).send({ error: "This club does not exist this school year." });

   const docs = await userModel
      .aggregate([
         {
            $match:
               // {role:"teacher"}
               {
                  $and: [
                     { role: "teacher" },
                     { schoolID: req.userInfo.schoolID },
                  ],
               },
         },
         {
            $lookup: {
               from: "teachers", // ตารางที่อยาก join
               localField: "_id", // user
               foreignField: "userID", // teacher
               as: "teacher", // ชื่อผลลัพท์
            }, // [{... userData, teacher:{userID:[objectID]}},...]
         },
         { $unwind: "$teacher" },
         {
            $project: {
               email: 1,
               schoolID: 1,
               teacher: 1,
            },
         },
      ])
      .exec();

   const teachers = [];
   for(let i=0;i<docs.length;i++){
      for(const Club of docs[i].teacher.clubs){
            if(Club.toString()==club._id){
               teachers.push(docs[i].teacher)
            }
      }
   }
   res.send(teachers);
};

module.exports = getClubTeachers;
