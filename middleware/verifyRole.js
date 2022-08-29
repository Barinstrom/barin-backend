const verifyRoles = (...allowedRoles) => {
    return (req,res,next) => {
        if(!req || !req.userInfo || !req.userInfo.role) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        const result = rolesArray.includes(req.userInfo.role);
        console.log(req.userInfo.role,rolesArray)
        if(!result) return res.status(401).send('this is not yours role :(');
        console.log('pass');
        next();
    }
}

module.exports = verifyRoles;