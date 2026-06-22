const reportModel = require("../models/report.model")
const pdfParse = require("pdf-parse")
const generateReport = require("../services/ai.service")
const { Behavior } = require("@google/genai")

// route  1
async function generateReportController(req, res) {
    
        // if no resume provided then what ??
//         JavaScript runs code top to bottom. So when someone submits
//  only a self description (no resume — which your check says should 
// be totally fine), the very first line still tries to do req.file.buffer
// . Since req.file is undefined in that case, it crashes before execution
//  ever reaches your validation check.
// Your check is correct in intent — "require at least one of resume 
// or selfDescription" — but it's checking the result of something that
//  already blew up trying to compute it.


    try {

        let resumeText = ''

        if (req.file) {
            const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
            resumeText = resumeContent.text
        }


        const { selfDescription, jobDescription } = req.body

        if (!jobDescription) {
            return res.status(400).json({
                message: 'Job description is required '
            })
        }
        //  && opertaor menas both should be tru so if no resume and no self desc
        //   agr yeh dono true hui then like na hi self desc or na hi resume then no we gotta have one 
        if (!resumeText && !selfDescription) {
            return res.status(400).json({
                message: "Please provide either a self description or resume"
            })
        }


         if (jobDescription.length > 5000) {
            return res.status(400).json({
                message : "Job Description is too long. Maximum 5000 characters allowed"
            })
         }


         if (selfDescription && selfDescription.length > 3000) {
            return res.status(400).json({
                message : "Self Description is too long. Maximum 3000 characters allowed "
            })
         }



        const reportByAi = await generateReport({ resume: resumeText, selfDescription, jobDescription })
     

        const finalReport = await reportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...reportByAi
            //  everything that ai report us back technical questions , behavioral questions 
        })

        res.status(201).json({
            message: "Report  generated Succesfully !",
            report: {
                id: finalReport._id,
                technicalQuestion: finalReport.technicalQuestion,
                behavioralQuestion: finalReport.behavioralQuestion,
                skillsGap: finalReport.skillsGap,
                preparationPlan: finalReport.preparationPlan,
                matchScore: finalReport.matchScore
            }
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'something went wrong while generating the report try agian later s'
        })
    }


}

// route  2
async function getReportController(req, res) {

    try {
        const reportId = req.params.reportId
        const report = await reportModel.findById(reportId)

        //  Check if we even have a report at first place
        if (!report) {
            return res.status(404).json({
                message: "Report Not Found"
            })
        }

        //  check ownership if the report that we are fetching form data base that report belongs to the user taht have requested that report ?
        //      report Model ke andar user ka filed ObjectId("39738792443894" isko string mein convert karo ad then check it with user model id if tehy are the same person 
        if (report.user.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to view this report "
            })
        }

        res.status(200).json({
            message: "Report Fetched Succesfully ",
            report: report
        })

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong while fetching the report "
        })
    }


}

// route 3 

async function getMyReportController(req, res) {


    try {
        const reports = await reportModel.find({
            user: req.user.id
        })

        res.status(200).json({
            message: "All reports fetched succesfully !",
            reports: reports
            //  thsi reports it will give back _id in response check moongoose atlas 
        })

    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong while fetching the reports"
        })
    }

}


module.exports = { generateReportController, getReportController, getMyReportController }

// npm pdf-parse   ( for pdf file ke andar ka content nikalne ke liye what inside this ipdf we want that with the help of pdf-parse)
// npm multer