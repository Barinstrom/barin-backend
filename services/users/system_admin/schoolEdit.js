const SchoolModel = require("../../../models/school");
const { cloudinary } = require("../../../utils/cloudinary");

const schoolEdit = async (req, res) => {
   const {
      schoolName,
      urlLogo,
      paymentStatus,
      status,
      urlCertificateDocument,
   } = req.body;

   const school = await SchoolModel.findOne({
         schoolID: req.body.schoolID
   });

   if ( schoolName && ( ((req.userInfo.role == "admin") && school.status == "approve") 
        || (req.userInfo.role == "host") ) ) {
      school.schoolName = schoolName;
   }

   if (paymentStatus && req.userInfo.role == "host") {
      const paymentStatusArray = ["success", "pending"];
      if (paymentStatusArray.includes(paymentStatus)) {
         school.paymentStatus = paymentStatus;
      }
      school.paymentDate = new Date();
   }

   if (status && req.userInfo.role == "host") {
      const statusArray = ["approve", "pending", "not_approve"];
      if (statusArray.includes(status)) {
         school.status = status;
      }
   }

   if (urlCertificateDocument && req.userInfo.role == "host") {
      try {
         const uploadDoc = await cloudinary.uploader.upload(
            urlCertificateDocument,
            {
               upload_preset: "certificate_doc",
               public_id: req.userInfo.schoolID,
            }
         );
         const urldoc = uploadDoc.secure_url;
         school.urlCertificateDocument = urldoc;
      } catch (e) {
         return res.status(400).send({
            success: false,
            error: "Upload doc fail",
         });
      }
   }

   if ( urlLogo && ( ((req.userInfo.role == "admin") && school.status == "approve") 
   || (req.userInfo.role == "host") ) ) {
      try {
         const uploadLogo = await cloudinary.uploader.upload(urlLogo, {
            upload_preset: "urlLogo",
            public_id: req.userInfo.schoolID,
         });
         const logo = uploadLogo.secure_url;
         school.urlLogo = logo;
         console.log(logo);
      } catch (e) {
         return res.status(400).send({
            success: false,
            error: "Upload logo fail",
         });
      }
   }

   try {
      await school.save();
      res.json({ success: "true" });
   } catch (e) {
      return res.status(400).send({
         success: false,
         error: "Fail to save",
      });
   }
};

module.exports = schoolEdit;
