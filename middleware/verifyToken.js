const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
   const authHeader = req.headers.authorization || req.headers.Authorization;
   if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
   const token = authHeader.split(" ")[1];

   jwt.verify(token, process.env.SECRET, (err, decode) => {
      if (err) return res.status(401).send("token is invalid");
      // decode => payload of jwt
      req.userInfo = decode;
      //console.log(decode);
      next();
   });
};

module.exports = verifyToken;
