const clubModel = require("../../models/club");
const teacherModel = require("../../models/teacher");

const addClubs = async (req, res) => {
    const clubs = req.body;
    //check club name
    for(const club of clubs){
        if (await clubModel.findOne({ clubName: club.clubName, schoolID: req.userInfo.schoolID}))
            return res.status(400).send({ error: "Club name is already exists." });

        //หา teacher เพื่อไป add clubID in teacher
        const teacherFName = club.firstname;
        const teacherLName = club.lastname;
        teacher = await teacherModel.findOne({ firstname: teacherFName, lastname: teacherLName});
        if (!teacher)
            return res.status(400).send({ error: "This teacher doesn't exist." });

        //เตรียม payloadClub
        const payloadClub = club;
        payloadClub["schoolID"] = req.userInfo.schoolID;
        delete payloadClub["firstname"];
        delete payloadClub["lastname"];

        //add new club
        const newClub = await clubModel.create(payloadClub);
        const clubID = newClub._id;

        // add clubID in teacher
        const payloadTeacher = [...teacher.clubs, clubID];
        await teacherModel.updateOne(
            { firstname: teacherFName, lastname: teacherLName},
            { $set: { clubs: payloadTeacher } }
        )
        .catch((err) => {
            return res.status(400).send(err);
        });
    }
    res.send({ success: true });
};

module.exports = addClubs;