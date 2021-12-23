const VerifyAccess = (requiredRole) => {


    return async (req, res, next) => {

        try {
            const { role } = req.user;
            console.log(requiredRole)
            if (requiredRole != role) {
                return res.status(401).json({ error: "You don't have access to this Api" })
            }

           return next();

        }
        catch (err){
console.log(err);

        };

    };
}

    export default VerifyAccess;