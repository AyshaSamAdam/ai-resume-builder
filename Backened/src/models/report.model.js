const mongoose = require("mongoose")


const technicalQuestionSchema = new mongoose.Schema({

    question: {
        type: String,
        required: [true, "technical question is required"]
    },

    intention: {
        type: String,
        required: [true, "intention is required"]
    },
    answer: {
        type: String,
        required: [true, "answer is required"]
    }



}, { _id: false })


const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "question is required"],
    },
    intention: {
        type: String,
        required: [true, "intention is required"]
    },
    answer: {
        type: String,
        required: [true, "answer is required"]
    }
}, { _id: false })


const skillsGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    severity: {
        type: String,
        required: [true, "severity is required"],
        enum: ["low", "medium", "high"]
    }

}, { _id: false })



const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [true, "day is required"]
    },
    focus: {
        type: String,
        required: [true, "focus is required"]
    },
    tasks: {
        type: [String],
        required: [true, "tasks is required"]
    }

}, { _id: false })


const reportSchema = new mongoose.Schema({

    jobDescription: {
        type: String,
        required: [true, "Job Description is Required."]
    },
    selfDescription: {
        type: String,
    },
    resume: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    technicalQuestion: [technicalQuestionSchema],
    behavioralQuestion: [behavioralQuestionSchema],
    skillsGap: [skillsGapSchema],
    preparationPlan: [preparationPlanSchema],
//  ye jo interview report generate kar rahe hain kis user ke liye kar rahe hain ?
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    }

}, {
    timestamps: true
})


const reportModel = mongoose.model("reportModel", reportSchema )

module.exports = reportModel