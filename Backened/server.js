require('dotenv').config()

const requiredEnvVars = [
    'PORT',
    'MONGO_URI',
    'JWT_SECRET',
    'JWT_REFERESH_SECRET',
    'REDIS_URL',
    'CLIENT_URL',
    'GOOGLE_GENAI_API_KEY',
    'NODE_ENV'
]

requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
        console.error(`MISSING REQUIRED ENV VAR: ${varName}`)
        process.exit(1)
    }
})




const app = require("./src/app");
const connectDB = require("./src/config/database")


connectDB()


app.listen(process.env.PORT, () => {
    console.log("server is running on port 3000")
})