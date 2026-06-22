const express = require("express");
const protect = require("../middleware/auth.middleware")
const reportController = require("../controllers/report.controllers")
const reportRouter =   express.Router()
const upload = require("../middleware/multer.middleware")


reportRouter.post("/input", protect, upload.single("resume") , reportController.generateReportController  )

reportRouter.get("/my-reports", protect, reportController.getMyReportController)

reportRouter.get("/:reportId", protect, reportController.getReportController)
  
module.exports = reportRouter