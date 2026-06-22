const jwt = require("jsonwebtoken")
const redis = require('../config/redis');

const protect = async (req, res, next) => {
try{
    
    const accessToken = req.headers.authorization?.split(' ')[1]

    if (!accessToken) {
        return res.status(401).json({
            message : "No token Not Authorized "
        })
    }

    const tokenInRedis = await redis.get(accessToken)
 
    if(!tokenInRedis) {
        return res.status(401).json({
            message : "Session expired please login"
        })
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
    req.user = decoded
    next()
}
catch(error ) {
    console.log(error)
}
    
}


module.exports = protect











// gets access token from headers 
// if no token  then user is unauthorozed 401
//  check redis idf redis has access token 
// if not in redis then 401 ( recat will call / refresh token)
// verify token with jwt 
// req.user = decode 
// next
