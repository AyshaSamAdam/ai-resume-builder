const express = require("express")
const protect = require("../middleware/auth.middleware")


const authRouter = express.Router();
const {loginLimiter, registerLimiter, refreshLimiter} = require("../middleware/rateLimiter")
const authController = require("../controllers/auth.controllers")

authRouter.post("/register", registerLimiter,  authController.registerUserController )

authRouter.post("/login", loginLimiter, authController.loginUserController )
// register no token jsut creating an acc nothing to check so no middle ware 
// login no token yet just proving who they are nothing to check so no middleware
// logout must have  atoken because they were logged in middleware check it
// No token means like ntoken are created at register and login but at log out u already have the token so u need to show your token first then leave 
authRouter.post("/logout", protect, authController.logoutUserController)

authRouter.post('/refresh-token', refreshLimiter,  authController.refreshTokenControlller)


authRouter.get("/me", protect,  authController.getMeController)



module.exports = authRouter