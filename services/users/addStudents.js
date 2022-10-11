const studentModel = require("../../models/student");
const userModel = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { activate } = require("../../utils/activate");
// const { sender } = require("../../utils/mail");

const addStudents = async (req, res) => {
   let mergingStudent = req.body; // array of object
   for (let i = 0; i < mergingStudent.length; i++) {
      const {
         email,
         firstname,
         lastname,
         enteredYear,
         classYear,
         isActive,
         tel = "EMPTY",
      } = mergingStudent[i];
      if (
         (!email, !firstname, !lastname, !enteredYear, !classYear, !isActive)
      ) {
         res.status(400).send({
            error: "email, firstname, lastname, enteredYear, classYear, isActive is all required",
         });
      }
   }
   const doc = await userModel
      .aggregate([
         {
            $match:
               // {role:"student"}
               {
                  $and: [
                     { role: "student" },
                     { schoolID: req.userInfo.schoolID },
                  ],
               },
         },
         {
            $lookup: {
               from: "students",
               localField: "_id",
               foreignField: "userID",
               as: "student",
            },
         },
         { $unwind: "$student" },
         {
            $project: {
               email: 1,
               schoolID: 1,
               student: 1,
            },
         },
      ])
      .exec();

   const new_student = [];
   for (let i = 0; i < mergingStudent.length; i++) {
      let isold = false;
      for (let j = 0; j < doc.length; j++) {
         if (mergingStudent[i].email == doc[j].email) {
            // old student => update
            const {
               email,
               firstname,
               lastname,
               enteredYear,
               classYear,
               isActive,
               tel = "EMPTY",
            } = mergingStudent[i];
            // const clubsID = clubs.map((el) => {
            //    return new mongoose.mongo.ObjectId(el);
            // });
            const update_data = {
               email,
               schoolID: req.userInfo.schoolID,
               firstname,
               lastname,
               enteredYear,
               classYear,
               isActive,
               tel,
               // clubs: clubsID,
            };
            studentModel.findByIdAndUpdate(doc[j].student._id, {
               $set: update_data,
            });
            isold = true;
         }
      }
      //console.log('aaaa',isold);
      if (!isold) {
         const {
            email,
            firstname,
            lastname,
            enteredYear,
            classYear,
            isActive,
            tel = "EMPTY",
         } = mergingStudent[i];
         const characters =
            "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
         let password = "";
         for (let i = 0; i < 25; i++) {
            password +=
               characters[Math.floor(Math.random() * characters.length)];
         }
         password = bcrypt.hashSync(password, 10);
         const token = jwt.sign(
            { email: email },
            process.env.RESET_PASSWORD_KEY,
            {
               expiresIn: "7d",
            }
         );

         const new_user = await userModel.create({
            email,
            schoolID: req.userInfo.schoolID,
            role: "student",
            password,
            status: "Pending",
            resetToken: token,
         });
         await studentModel.create({
            userID: new_user._id,
            firstname,
            lastname,
            tel,
            enteredYear,
            classYear,
            isActive,
            tel,
            // clubs: clubsID,
         });
         activate(
            new_user.email,
            firstname,
            _school.schoolName,
            new_user.schoolID,
            new_user.resetToken
         );
         // sender(new_user.email, new_user.email, new_user.confirmationCode);
         new_student.push(new_user);
         //res.send({ success: true });
      }
   }

   res.send(new_student);
};

module.exports = addStudents;
