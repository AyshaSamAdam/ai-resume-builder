const  { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
    apiKey : process.env.GOOGLE_GENAI_API_KEY
});


const reportSchema =  z.object({

    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),

    technicalQuestion : z.array(z.object({
        question : z.string().describe("the technical questions that can be asked in interview."),
        intention : z.string().describe("the intention of interviewver behind asking this question"),
        answer : z.string().describe("how to answer this question, what points to cover and what approach to take etc.")
    })).describe("the technical questions that can be asked in the interview along with their intention and how to answer them "),


    behavioralQuestion : z.array(z.object({
         question : z.string().describe("the behavioral questions that can be asked in an interview ?"),
        intention: z.string().describe("the intention of interviewver behind asking this question  "),
         answer : z.string().describe("how to answer this question, what points to cover and what approach to take etc.."),
    })).describe("thye behavioral questions that can be asked in an interview along with their intention and how to answer them"),


    skillsGap : z.array(z.object({
        skill : z.string().describe("the skills which the candidate is lacking "),
        severity : z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),


    preparationPlan : z.array(z.object({
        day : z.number().describe("The day number in the preparation plan, starting from 1"),
        focus : z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks : z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")

    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively")


})

async function generateReport({resume, selfDescription, jobDescription}) {
    

            const prompt = `generate an interview report for a candidate with the following details : 
            resume : ${resume}
            selfDescription : ${selfDescription}
            jobDescription : ${jobDescription}`

        const response =   await ai.models.generateContent({

                model : "gemini-2.5-flash",
                contents :  prompt,

                 config: {
                    responseMimeType: "application/json",
                    responseSchema: z.toJSONSchema(reportSchema),

                   }
             })
   return JSON.parse(response.text)
}





module.exports = generateReport

