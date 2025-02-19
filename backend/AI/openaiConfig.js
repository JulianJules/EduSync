const { json } = require('express');
const OpenAI = require('openai')
const {zodResponseFormat} = require("openai/helpers/zod")
const {z} = require("zod")



// const StudySession = z.object({
//     day: z.string(), // e.g., "Monday"
//     time_slots: z.array(z.string()), // e.g., ["10:00 AM - 11:00 AM", "2:00 PM - 3:00 PM"]
//   });
  
//   const StudyPlanner = z.object({
//     totalHours: z.number(),
//     sessionDuration: z.number(), // in minutes
//     studyDays: z.array(z.string()), // e.g., ["Monday", "Wednesday"]
//     sessions: z.array(StudySession),
//   });

// const HabitProgress = z.object({
//     date: z.string(), // e.g., "2025-01-28"
//     status: z.enum(["completed", "missed", "partial"]), // e.g., "completed"
//   });
  
//   const Habit = z.object({
//     habit_name: z.string(), // e.g., "Exercise"
//     target: z.string(), // e.g., "30 minutes"
//     frequency: z.enum(["daily", "weekly", "monthly"]), // e.g., "daily"
//     progress: z.array(HabitProgress),
//   });
  
//   const HabitTracker = z.object({
//     habits: z.array(Habit),
//   });

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const generateJSON = async(req, res) => {
//     if (!req.body) {
//         console.log(req)
//         return res.status(400).json({message: 'Request body is missing'})
//     }

//     const {content} = req.body
//     const completion = await openai.beta.chat.completions.parse({
//         model: "gpt-4o-mini",
//         messages: [
//             { role: "system", content: "You are a student assistant. Only provide structured responses for study planning, daily planner, habit tracking, adding events to calendar, and motivation." },
//             { role: "user", content: content},
//         ],
//         response_format: zodResponseFormat(HabitTracker, "habit_tracker"), max_completion_tokens: 200
//       });
//       const event = completion.choices[0].message.parsed;
//     res.status(200).json({
//         content: event 
//     })
// }



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const generateMeta = async(req, res) => {
    if (!req.body) {
        console.log(req)
        return res.status(400).json({message: 'Request body is missing'})
      }
    
    const {content} = req.body

    try {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            {
                role: 'system', 
                content: 'You are a student assistant. Only provide structured responses for study planning, daily planner, habit tracking, adding events to calendar, motivation, and after you get the information you make it to a table.'
            },
            {
                role: 'user',
                content: content
            }
        ],
        response_format: {
          "type": "text"
        },
        temperature: 1,
        max_completion_tokens: 200,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      });
      const data = response.choices
      const messageContent = data[0].message.content
      console.log(messageContent)
      //console.log(response.choices)

      res.status(200).json({
        content: messageContent 
      })
    } catch {
        console.error("Invalid request detected:", error.message);

        // Default response for unsupported requests
        return {
          message: "I'm here to help with study planning, motivation, and habit tracking! Unfortunately, I can't generate essays, but I can help organize your study sessions."
        };
    }
}
 module.exports = {generateMeta}