const rateLimit = require("express-rate-limit");

// login limiter 
// only 5 attempts per 15 minutes 
 const loginLimiter = rateLimit({
    windowMs : 15 * 60 * 1000 ,  // 15 minutues
      max : 5,   // maximum  5 attempts 
      message : {
        message : "Too many login attempts, please try agian after 15 minutes "
      }

})

// register limiter 
// only 10 accounts per hour from same IP 


 const registerLimiter = rateLimit({
    windowMs : 60 * 60 * 1000,   //  1 hour 
    max : 10,
    message : {
        message : "Too many accounts created, please try again after an hour "
    }
   
})


// refresh token limiter 
// only 30 attempts per 15 minutes

 const refreshLimiter = rateLimit({
    windowMs :   15 * 60 * 1000,
    max : 30,
    message : {
        message  : " too many requests, please try agin after 15 minutes "
    }

})


module.exports = { loginLimiter, registerLimiter, refreshLimiter };

