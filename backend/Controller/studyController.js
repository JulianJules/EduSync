const OpenAI = require('openai');
const { zodResponseFormat } = require("openai/helpers/zod");
const { z } = require("zod");
const model = require('../Models/chatSummary');
const { response } = require('express');
const { use } = require('../Routes/openaiRoutes');


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const studyAssistantInstructions = `
  You are a Study Assistant. Your only task is to create structured time management study plans for students.

  **Rules:**
  - You must ask the user how many weeks they need to study.
  - Ask what days and times they are available to study.
  - Ask for the subject(s) they need to study.
  - When they are changing the plan on a certain week you keep the original plan for the other weeks. You only change all when they don't specify which to change
  - When generating a plan, always return it in a JSON object with the exact format below.
  - Do not include any // comments
  **JSON Format Example:**
  [
    {
      "week": "Week 1: [Descriptive Title]",
      "sessions": [
        { "day": #, "startTime": "10:00 AM", "endTime": "12:00 PM", "name": "Algebra & Geometry", "description": "Review basic concepts", "color": "#ff9999" },
        { "day": #, "startTime": "4:00 PM", "endTime": "6:00 PM", "name": "Practice Problems", "description": "Solve problems for basic concepts", "color": "#ffcc99" }
      ]
    },
    {
      "week": "Week 2: [Descriptive Title]",
      "sessions": [
        { "day": #, "startTime": "4:00 PM", "endTime": "6:00 PM", "name": "Word Problems", "description": "Study real-life applications", "color": "#b3ffb3" }
      ]
    }
  ]

  **Additional Notes:**
  - "day" should be a number (0 = Monday, 1 = Tuesday, ..., 6 = Sunday).
  - Sessions should be evenly distributed based on user availability.
  - Subjects should be rotated if multiple subjects are provided.
  - The "color" field should be varied but remain soft and visually distinct.

  If the user does not provide necessary information, politely ask for it before generating a plan.
`;

//Creates the Assistant Bot if not already in the database
async function create_assistant(userId) {
  const assistant_exist = await model.findOne({userId: userId});
  console.log(assistant_exist)
  if (!assistant_exist) {
    //This creates the Assistant ID 
    const assistant = await openai.beta.assistants.create({
      name: "Study Assistant",
      instructions: studyAssistantInstructions,
      tools: [{ type: "code_interpreter" }],
      model: "gpt-4o-mini"
    });
    return assistant.id
  } else if (assistant_exist) {
    return assistant_exist  
  }
}

async function create_Thread(userId) {
    //This creates the Thread ID if isn't created before
    const thread = await openai.beta.threads.create();
    //console.log(thread.id)
    return thread.id
}


const chatBot = async (req, res) => {
  try {
    const { userInput, userId } = req.body;

    const assistant = await create_assistant(userId)
    
    //Have to change it since thread_id and assistant_id won't exist
    let thread_id;
    let assistant_id;

    
    //If chatBot hasn't been made before, it will add the IDs to the database
    if (typeof assistant === "string") {
      assistant_id = assistant
      thread_id = await create_Thread(userId)
      await model.create({userId, thread_id, assistant_id})
      //const assistant_exist = await model.findOne({userId: userId});
    } else {
      thread_id = assistant.thread_id
      assistant_id = assistant.assistant_id
    }

    //Add messages to thread
    const message = await openai.beta.threads.messages.create(
      thread_id,
      {
        role: "user",
        content: userInput
      }
    ); 

    res.status(200).json("GOOD")
  } catch (error) {
    console.log(error)
  }

}


module.exports = {chatBot}