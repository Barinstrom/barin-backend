const clubModel = require("../../models/club");
const mongoose = require('mongoose');

const getSchoolYear = async (req, res) => {
    const queryclubs = await clubModel.find({ groupID: req.query.groupID });
    if (!queryclubs)
        return res.status(400).send({ error: "This groupID doesn't exist." });

    let schoolYear = [];
    for (let i = 0; i < queryclubs.length; i++) {
        schoolYear.push(queryclubs[i].schoolYear);
    }
    res.send(schoolYear);
};

module.exports = getSchoolYear;
