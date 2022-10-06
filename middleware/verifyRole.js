const verifyRoles = (...allowedRoles) => {
   return (req, res, next) => {
      if (!req || !req.userInfo || !req.userInfo.role)
         return res.sendStatus(401);
      const rolesArray = [...allowedRoles];
      const result = rolesArray.includes(req.userInfo.role);
      if (!result) return res.status(401).send("this is not yours role :(");
      next();
   };
};

module.exports = verifyRoles;
