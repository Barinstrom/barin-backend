const verifyRoles = (...allowedRoles) => {
    return (req,res,next) => {
        if(!req || !req.userInfo || !req.userInfo.role) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        if(!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyRoles;