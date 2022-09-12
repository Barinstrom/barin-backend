const teacherModel = require("../../models/teacher");
const userModel = require("../../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sender } = require("../../utils/mail");

const addTeachers = async (req, res) => {
   let mergingTeacher = req.body; // array of object
   for (let i = 0; i < mergingTeacher.length; i++) {
      const { email, firstname, lastname, tel } = mergingTeacher[i];
      if ((!email, !firstname, !lastname)) {
         res.status(400).send({
            error: "email, firstname, lastname, is all required for all record",
         });
      }
   }
   const doc = await userModel
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
               from: "teachers",
               localField: "_id",
               foreignField: "userID",
               as: "teacher",
            },
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

   const new_teacher = [];
   //console.log(mergingTeacher.length,doc.length)
   for (let i = 0; i < mergingTeacher.length; i++) {
      let isold = false;
      for (let j = 0; j < doc.length; j++) {
         if (mergingTeacher[i].email == doc[j].email) {
            // old teacher => update
            const { email, firstname, lastname, tel} =
               mergingTeacher[i];
            // const clubsID = clubs.map((el) => {
            //    return new mongoose.mongo.ObjectId(el);
            // });
            const update_data = {
               email,
               schoolID: req.userInfo.schoolID,
               firstname,
               lastname,
               tel,
               // clubs: clubsID,
            };
            teacherModel.findByIdAndUpdate(doc[j].teacher._id, {
               $set: update_data,
            });
            isold = true;
         }
      }
      //console.log('aaaa',isold);
      if (!isold) {
         const { email, firstname, lastname, tel} = mergingTeacher[i];
         // const clubsID = clubs.map((el) => {
         //    return new mongoose.mongo.ObjectId(el);
         // });
         // if (
         //    req.userInfo.role === "admin" &&
         //    req.userInfo.schoolID !== schoolID
         // ) {
         //    return res
         //       .status(401)
         //       .send({ error: "this school is not your school" });
         // }
         const characters =
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
         let password = "";
         for (let i = 0; i < 25; i++) {
            password +=
               characters[Math.floor(Math.random() * characters.length)];
         }
         password = bcrypt.hashSync(password, 10);
         const token = jwt.sign({ email: email }, process.env.SECRET, {
            expiresIn: "7d",
         });

         const new_user = await userModel.create({
            email,
            schoolID: req.userInfo.schoolID,
            role: "teacher",
            password,
            status: "Pending",
            confirmationCode: token,
         });
         await teacherModel.create({
            userID: new_user._id,
            firstname,
            lastname,
            tel,
            // clubs: clubsID,
         });
         sender(new_user.email, new_user.email, new_user.confirmationCode);
         new_teacher.push(new_user);
         //res.send({ success: true });
      }
   }

   res.send(new_teacher);
};

module.exports = addTeachers;
