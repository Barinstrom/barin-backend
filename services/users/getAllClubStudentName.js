const { default: mongoose } = require("mongoose");
const logModel = require("../../models/registerLogs");
const studentModel = require("../../models/student");

const getClubStudentName = async (req, res) => {
   if (!req.query.clubID) {
      return res.status(400).json({ message: "You didn't send clubID" });
   }
   const clubID = req.query.clubID;

   let _docs = await logModel
      .aggregate([
         {
            $match:
               // {role:"teacher"}
               {
                  $and: [{ clubID: new mongoose.mongo.ObjectId(clubID) }],
               },
         },
         {
            $lookup: {
               from: "students", // ตารางที่อยาก join
               localField: "studentID", // user
               foreignField: "userID", // student
               as: "student", // ชื่อผลลัพท์
            }, // [{... userData, student:{userID:[objectID]}},...]
         },
         { $unwind: "$student" },
         {
            $sort: {
               date: 1,
            },
         },
      ])
      .exec();

   let docs = [];
   for (let i = 0; i < _docs.length; i++) {
      if (_docs[i].action == "register") {
         docs.push(_docs[i]);
      }
      if (_docs[i].action == "drop") {
         for (let j = 0; j < docs.length; j++) {
            if (
               _docs[i].student.userID.toString() ==
               docs[j].student.userID.toString()
            ) {
               docs.splice(j, 1);
               break;
            }
         }
      }
   }

   let count = docs.length;

   let finalDocs = [];
   for (let i = 0; i < count; i++) {
      const name = {
         firstname: docs[i].student.firstname,
         lastname: docs[i].student.lastname,
      };
      finalDocs.push(name);
   }

   res.send(finalDocs);
};

module.exports = getClubStudentName;
