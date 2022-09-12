const SchoolModel = require("../../models/school");
// const moment = require('moment');

const updateSchedule = async (req, res) => {
    const schoolID = req.body.schoolID
    const school = await SchoolModel.findOne({schoolID:schoolID})
    // console.log(school)
    if(!school)
    {
        return res.send("Invalid schoolID")
    }
    for(let i=0;i<school.schedule.length;i++)
    {
        if(req.body.schoolYear == school.schedule[i].schoolYear)
            return res.send("Invalid schoolYear")
    }
    
    const addSchedule = {
        "schoolYear": req.body.schoolYear,
        "registerDate": new Date(req.body.registerDate),
        "endOfRegisterDate": new Date(req.body.endOfRegisterDate),
        "endOfSchoolYear":  new Date(req.body.endOfSchoolYear)
    }
    // console.log(addSchedule)
    const totalSchedule = [...school.schedule, addSchedule]
    // console.log(totalSchedule)
    await SchoolModel.findOneAndUpdate({schoolID: schoolID}, { $set: {schedule : totalSchedule}})
        .then(() => {
            res.send({ 'success': true });
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

module.exports = updateSchedule;