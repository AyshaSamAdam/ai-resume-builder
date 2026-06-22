const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const redis = require("../config/redis")

async function registerUserController(req, res) {
    try{
        

           const {username, email, password} = req.body 

    // 400  This indicates the data sent by your browser did not follow the server's required rules or syntax

    if(!username || !email  || !password) {
        return res.status(400).json({
            message : "all 3 fields must be filled"
        })
    }
  
    const isUserAlreadyExists = await userModel.findOne({
        $or : [
            {username},
            {email}
        ]
    })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message : "Account already exists with this username or email"
        })
    }
      if (email.length > 100) {
        return res.status(400).json({
            message : "Email too long Maximum 100 characters."
        })
      }


      if (password.length < 6 || password.length > 12) {
    return res.status(400).json({ message: "password must be between 6 and 12 characters" })
}


   
    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password : hash

    })

    res.status(201).json({
        message : "User Registered Succesfully !",
        id : user._id,
        username : user.username,
        email : user.email
    })
    }
    catch(err) {
        //  for validation in model while registering check min length regex logic
         if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message)
        return res.status(400).json({ message: messages[0] })
    }
        console.log(err)
        return res.status(500).json({
            message : "Error While Registering User"
        })
    }
}

async function loginUserController(req, res) {

    try{
          const {email, password} = req.body

    const user = await userModel.findOne(
        {email}
    )

    if(!user) {
        return res.status(400).json({
            message : "Invalid Email or Password"
        })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)


     if(!isValidPassword){
        return res.status(400).json({
            message : "Invalid Email or Password"
        })
    }

    const accessToken = await jwt.sign({
        id : user._id
    }, process.env.JWT_SECRET, {expiresIn : '15m'})



    const refreshToken = await jwt.sign({
           id : user._id
    }, process.env.JWT_REFERESH_SECRET, {expiresIn : "7d"})



    await redis.set(accessToken, user._id.toString(), 'EX', 15 * 60)
     await redis.set(refreshToken, user._id.toString(), 'EX', 7 * 24 * 60 * 60)



     
    res.cookie('refreshToken', refreshToken,{
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production',
        sameSite : 'strict',
        maxAge : 7 * 24 * 60 * 60 * 1000     // 7 days


    })
    res.status(200).json({
        message : "You have login Succesfully ",
        accessToken,
        user : {
           id : user._id,
           username : user.username,
           email : user.email
             
        }
    })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            message : "Error While loggin In User"
        })
        
    }
}

async function logoutUserController(req, res) {
    try{
        const accessToken = req.headers.authorization?.split(' ')[1]

        const token = req.cookies.refreshToken

        //  if no refresh token at first place it means the user was not logged in in the first place 
        if (!token) {
            return res.status(401).json({
                message : "Not Logged in "
            })
        }

        if (token && !accessToken) {
            await redis.del(token)
            res.clearCookie('token')
            return res.status(200).json({
                message : "log out succesfully "
            })
        }
         
        if (token && accessToken) {
            await redis.del(token)
             await redis.del(accessToken)
             res.clearCookie('token')
             res.clearCookie('accessToken')
             return res.status(200).json({
                message : "log out succesfully "
            })

        }
    }

    catch(err) {
        return res.status(500).json({
          message : "Something went wrong"
   })
                                     
                                       
    }

}


async function refreshTokenControlller(req, res) {

      try{
          const token = req.cookies.refreshToken

        //  check if we have refresh token if not user is not logged in 
        if (!token) {
            return res.status(401).json({
                message : "no refresh token plese log in"
            })
        }
//    check if the refresh token exist in redis if not then user log out and it was del from redis
// dekho agr refresh token exist karti hai redis mein agr nahi user ne pehle hi log out kar liya 
         const tokenInRedis = await  redis.get(token)
         if (!tokenInRedis) {
            return res.status(401).json({
                message :" Refresh token expired please log in"
            })
         }
        //  but if we have refresh token in redis verify it thet refresh token is valid

        const decoded = await jwt.verify(token,process.env.JWT_REFERESH_SECRET)

        //  after verifying it make a new access token 

        const newAccessToken = jwt.sign({
            id : decoded.id
        }, process.env.JWT_SECRET,  {expiresIn : '15m'})


        // now set new access token in redis 
        await redis.set(newAccessToken,decoded.id.toString(), 'EX', 15 * 60)

        res.status(200).json({
            accessToken : newAccessToken
            
        })
      }
      catch(err) {
        console.log(err)
        return res.status(500).json({
            message : "Something went Wrong", err

        })
      }

}



async function getMeController(req, res) {
   
   try{
     const user = await userModel.findById( req.user.id)
     
     if (!user) {
        return res.status(400).json({
            message : "User not found"
        })
     }

    res.status(200).json({
        message : "User  info",
        user : {
                 id : user._id,
        username : user.username,
        email : user.email
        }

      

    })
   }
   catch(err) {
    console.log("error while fetching the user", err)
   }
}






module.exports = {registerUserController, loginUserController, logoutUserController, refreshTokenControlller, getMeController}



// ?REFRESH CONTROLLER LOGIC WHY DO WE NEED A REFRESH TOKEN CONTROLLER 

//  user logs in 
// gets accessToken (lives 15 minutes)
// gets refreshToken (lives 7 days )
// access token DIES 
// Redis automatically deletes it 


// Now user Tries to do something 
// React sends accessToken to server
// middleware checks redis 1
// token not found
// middleware says 401  " session expired 
// React receives 401"


// Without refresh token controller
// user gets blocked 
// has to login again 
// every 15 mins!
// terrible experience

// With refresh token controller
// react sees  401
// React automatically calls /refresh-token 
// server checks refreshToken from cookie
// still valid -> cretaes new accessTokensends back to React
// React saves new access token in useState
// user never notices anything happened 


